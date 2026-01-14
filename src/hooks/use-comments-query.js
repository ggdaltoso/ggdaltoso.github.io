import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useGitHubAuth } from './use-github-auth';

export const useCommentsQuery = (issueNumber, enabled = true) => {
  const { getToken, owner, repo } = useGitHubAuth();

  return useQuery({
    queryKey: ['comments', owner, repo, issueNumber],
    queryFn: async () => {
      const token = getToken();
      const headers = {
        Accept: 'application/vnd.github.v3.html+json, application/vnd.github.squirrel-girl-preview+json',
      };

      if (token) {
        headers['Authorization'] = `token ${token}`;
      }

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
        { headers },
      );

      if (!response.ok) {
        throw new Error('Failed to load comments');
      }

      return response.json();
    },
    enabled: enabled && !!issueNumber,
    staleTime: 0, // Don't cache, always fetch fresh data
  });
};

export const usePostCommentMutation = (issueNumber) => {
  const { getToken, owner, repo } = useGitHubAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentBody) => {
      const token = getToken();

      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
        {
          method: 'POST',
          headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3.html+json',
          },
          body: JSON.stringify({ body: commentBody }),
        },
      );

      if (!response.ok) {
        throw new Error('Error posting comment');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch comments
      queryClient.invalidateQueries({
        queryKey: ['comments', owner, repo, issueNumber],
      });
    },
  });
};

export const useCommentReactionsQuery = (commentId, enabled = true) => {
  const { getToken, owner, repo } = useGitHubAuth();

  return useQuery({
    queryKey: ['commentReactions', owner, repo, commentId],
    queryFn: async () => {
      const token = getToken();
      const headers = {
        Accept: 'application/vnd.github.squirrel-girl-preview+json',
      };

      if (token) {
        headers['Authorization'] = `token ${token}`;
      }

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues/comments/${commentId}/reactions`,
        { headers },
      );

      if (!response.ok) {
        throw new Error('Failed to load reactions');
      }

      return response.json();
    },
    enabled: enabled && !!commentId,
    staleTime: 0,
  });
};

export const useToggleReactionMutation = (issueNumber) => {
  const { getToken, owner, repo, user } = useGitHubAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId, reactionType, action }) => {
      const token = getToken();

      if (!token) {
        throw new Error('Not authenticated');
      }

      if (action === 'add') {
        // Add reaction
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/issues/comments/${commentId}/reactions`,
          {
            method: 'POST',
            headers: {
              Authorization: `token ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/vnd.github.squirrel-girl-preview+json',
            },
            body: JSON.stringify({ content: reactionType }),
          },
        );

        if (!response.ok) {
          throw new Error('Error adding reaction');
        }

        return response.json();
      } else {
        // Remove reaction - need to find the reaction ID first
        const listResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/issues/comments/${commentId}/reactions`,
          {
            headers: {
              Authorization: `token ${token}`,
              Accept: 'application/vnd.github.squirrel-girl-preview+json',
            },
          },
        );

        if (!listResponse.ok) {
          throw new Error('Error fetching reactions');
        }

        const reactions = await listResponse.json();
        const userReaction = reactions.find(
          (r) =>
            r.content === reactionType && r.user.login === user?.login,
        );

        if (userReaction) {
          const deleteResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/issues/comments/${commentId}/reactions/${userReaction.id}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.squirrel-girl-preview+json',
              },
            },
          );

          if (!deleteResponse.ok) {
            throw new Error('Error removing reaction');
          }

          return { id: userReaction.id };
        }
      }
    },
    onSuccess: async (data, variables) => {
      // Force refetch both queries immediately
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ['comments', owner, repo, issueNumber],
          exact: true,
        }),
        queryClient.refetchQueries({
          queryKey: ['commentReactions', owner, repo, variables.commentId],
          exact: true,
        }),
      ]);
    },
  });
};

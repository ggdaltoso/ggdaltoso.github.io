import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useGitHubAuth } from './use-github-auth';

export const useCommentsQuery = (issueNumber, enabled = true) => {
  const { getToken, owner, repo } = useGitHubAuth();

  return useQuery({
    queryKey: ['comments', owner, repo, issueNumber],
    queryFn: async () => {
      const token = getToken();
      const headers = {
        Accept: 'application/vnd.github.v3.html+json',
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
    staleTime: 2 * 60 * 1000, // 2 minutes
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

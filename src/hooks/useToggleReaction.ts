import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Comment, ReactionType } from '@/types/comment';

interface UseToggleReactionParams {
  issueNumber: number;
  commentId: number;
}

export function useToggleReaction({
  issueNumber,
  commentId,
}: UseToggleReactionParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reaction: ReactionType) => {
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId,
          reaction,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao adicionar reação');
      }

      return data;
    },
    onMutate: async (reaction) => {
      await queryClient.cancelQueries({ queryKey: ['comments', issueNumber] });

      const previousComments = queryClient.getQueryData<Comment[]>([
        'comments',
        issueNumber,
      ]);

      // Atualização otimista: incrementa o contador da reação
      queryClient.setQueryData<Comment[]>(
        ['comments', issueNumber],
        (old = []) =>
          old.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  reactions: comment.reactions
                    ? {
                        ...comment.reactions,
                        [reaction]: comment.reactions[reaction] + 1,
                        total_count: comment.reactions.total_count + 1,
                      }
                    : undefined,
                }
              : comment,
          ),
      );

      return { previousComments };
    },
    onError: (err, reaction, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ['comments', issueNumber],
          context.previousComments,
        );
      }
    },
    onSuccess: () => {
      // Refetch para garantir sincronização com o servidor
      queryClient.invalidateQueries({ queryKey: ['comments', issueNumber] });
    },
  });
}

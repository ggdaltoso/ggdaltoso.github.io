import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Comment, Message } from '@/types/comment';

interface UseCreateCommentParams {
  issueNumber: number;
  onSuccess?: () => void;
  onError?: (message: Message) => void;
}

export function useCreateComment({
  issueNumber,
  onSuccess,
  onError,
}: UseCreateCommentParams) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (commentText: string) => {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issueNumber,
          comment: commentText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao adicionar comentário');
      }

      return data;
    },
    onMutate: async (commentText) => {
      // Cancela refetches em andamento
      await queryClient.cancelQueries({ queryKey: ['comments', issueNumber] });

      // Salva o estado anterior
      const previousComments = queryClient.getQueryData<Comment[]>([
        'comments',
        issueNumber,
      ]);

      // Atualização otimista
      if (session?.user) {
        const optimisticComment: Comment = {
          id: Date.now(),
          body: commentText,
          author: {
            login: session.user.name || 'Você',
            avatar_url: session.user.image || '',
            html_url: `https://github.com/${session.user.name}`,
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          html_url: '',
        };

        queryClient.setQueryData<Comment[]>(
          ['comments', issueNumber],
          (old = []) => [...old, optimisticComment],
        );
      }

      return { previousComments };
    },
    onError: (err, commentText, context) => {
      // Reverte para o estado anterior em caso de erro
      if (context?.previousComments) {
        queryClient.setQueryData(
          ['comments', issueNumber],
          context.previousComments,
        );
      }

      if (onError) {
        onError({
          type: 'error',
          text: err instanceof Error ? err.message : 'Erro ao enviar comentário',
        });
      }
    },
    onSuccess: (data) => {
      // Atualiza o cache com o comentário real retornado pelo GitHub
      if (data.comment) {
        queryClient.setQueryData<Comment[]>(
          ['comments', issueNumber],
          (old = []) => {
            // Remove o comentário otimista (ID temporário baseado em timestamp)
            const withoutOptimistic = old.filter((c) => c.id < 1000000000000);

            // Adiciona o comentário real do GitHub
            const realComment: Comment = {
              id: data.comment.id,
              body: data.comment.body,
              author: {
                login: session?.user?.name || '',
                avatar_url: session?.user?.image || '',
                html_url: `https://github.com/${session?.user?.name}`,
              },
              created_at: data.comment.created_at,
              updated_at: data.comment.created_at,
              html_url: data.comment.html_url,
            };

            return [...withoutOptimistic, realComment];
          },
        );
      }

      if (onSuccess) {
        onSuccess();
      }
    },
  });
}

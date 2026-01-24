import { useQuery, UseSuspenseQueryResult } from '@tanstack/react-query';
import { Comment } from '@/types/comment';

export function useComments(issueNumber: number) {
  return useQuery({
    queryKey: ['comments', issueNumber],
    queryFn: async () => {
      const response = await fetch(`/api/comments/${issueNumber}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erro ao buscar comentários');
      }

      return data.comments as Comment[];
    },
  }) as UseSuspenseQueryResult<Comment[]>;
}

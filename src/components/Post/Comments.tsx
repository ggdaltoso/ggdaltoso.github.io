'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

interface Comment {
  id: number;
  body: string;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  created_at: string;
  updated_at: string;
  html_url: string;
}

interface CommentsProps {
  issueNumber: number;
}

export default function Comments({ issueNumber }: CommentsProps) {
  const { data: session, status } = useSession();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Busca comentários existentes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments/${issueNumber}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setComments(data.comments);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [issueNumber]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      setMessage({
        type: 'error',
        text: 'Por favor, escreva um comentário',
      });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issueNumber,
          comment: comment.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Comentário adicionado com sucesso!',
        });
        const submittedComment = comment.trim();
        setComment('');

        // Adiciona comentário otimisticamente (UI update imediato)
        if (session?.user) {
          const optimisticComment: Comment = {
            id: Date.now(), // ID temporário
            body: submittedComment,
            author: {
              login: session.user.name || 'Você',
              avatar_url: session.user.image || '',
              html_url: `https://github.com/${session.user.name}`,
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            html_url: data.comment?.html_url || '',
          };
          setComments([...comments, optimisticComment]);
        }

        // Recarrega comentários do servidor para garantir sincronização
        setTimeout(async () => {
          const timestamp = Date.now();
          const commentsResponse = await fetch(
            `/api/comments/${issueNumber}?t=${timestamp}`,
            { cache: 'no-store' }
          );
          const commentsData = await commentsResponse.json();
          if (commentsResponse.ok && commentsData.success) {
            setComments(commentsData.comments);
          }
        }, 500);
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Erro ao adicionar comentário',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erro ao enviar comentário. Tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Comentários</h2>

      {/* Lista de comentários existentes */}
      {isLoading ? (
        <div className="mb-8 text-center py-8">
          <p className="text-gray-600">Carregando comentários...</p>
        </div>
      ) : comments.length > 0 ? (
        <div className="mb-8 space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="p-4 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <img
                  src={c.author.avatar_url}
                  alt={c.author.login}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <a
                      href={c.author.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-gray-900 hover:text-blue-600"
                    >
                      {c.author.login}
                    </a>
                    <span className="text-sm text-gray-500">
                      {new Date(c.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                    {c.body}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-8 text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Seja o primeiro a comentar!</p>
        </div>
      )}

      {/* Formulário para novo comentário */}
      {status === 'loading' ? (
        <div className="text-center py-4">
          <p className="text-gray-600">Carregando...</p>
        </div>
      ) : !session ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-gray-700 mb-4">
            Faça login com sua conta do GitHub para comentar
          </p>
          <button
            type="button"
            onClick={() => signIn('github')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            Login com GitHub
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <img
                src={session.user?.image || ''}
                alt={session.user?.name || ''}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-gray-900">
                {session.user?.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => signOut()}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sair
            </button>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Comentário *
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escreva seu comentário..."
              rows={5}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={isSubmitting}
            />
          </div>

          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Comentários são publicados como comentários na{' '}
              <a
                href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPO}/issues/${issueNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                issue do GitHub
              </a>
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Enviando...' : 'Comentar'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

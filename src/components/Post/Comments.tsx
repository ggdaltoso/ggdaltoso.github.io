'use client';

import { useState, useEffect, FormEvent } from 'react';

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
  const [name, setName] = useState('');
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
          name: name.trim() || undefined,
          comment: comment.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Comentário adicionado com sucesso! Recarregue a página para visualizá-lo.',
        });
        setName('');
        setComment('');

        // Recarrega comentários após adicionar novo
        setTimeout(async () => {
          const commentsResponse = await fetch(`/api/comments/${issueNumber}`);
          const commentsData = await commentsResponse.json();
          if (commentsResponse.ok && commentsData.success) {
            setComments(commentsData.comments);
          }
        }, 1000);
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nome (opcional)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          />
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
    </div>
  );
}

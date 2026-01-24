import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'ggdaltoso/ggdaltoso.github.io';
const [OWNER, REPO] = GITHUB_REPO.split('/');

export async function GET(
  request: NextRequest,
  { params }: { params: { issueNumber: string } }
) {
  try {
    const { issueNumber } = params;

    if (!issueNumber) {
      return NextResponse.json(
        { error: 'Issue number é obrigatório' },
        { status: 400 }
      );
    }

    // Busca comentários da issue (não precisa de token para leitura pública)
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Next.js Blog',
    };

    // Adiciona token apenas se estiver configurado e válido
    if (GITHUB_TOKEN && GITHUB_TOKEN.trim()) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/issues/${issueNumber}/comments`,
      {
        method: 'GET',
        headers,
        // Sem cache para sempre buscar comentários mais recentes
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('GitHub API error:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar comentários do GitHub' },
        { status: response.status }
      );
    }

    const comments = await response.json();

    // Busca reações para cada comentário
    const commentsWithReactions = await Promise.all(
      comments.map(async (comment: any) => {
        try {
          const reactionsResponse = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/issues/comments/${comment.id}/reactions`,
            {
              method: 'GET',
              headers: {
                ...headers,
                'Accept': 'application/vnd.github.squirrel-girl-preview+json',
              },
              cache: 'no-store',
            }
          );

          const reactions = reactionsResponse.ok ? await reactionsResponse.json() : [];

          // Agrega reações por tipo
          const reactionCounts = {
            '+1': 0,
            '-1': 0,
            laugh: 0,
            hooray: 0,
            confused: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          };

          reactions.forEach((reaction: any) => {
            if (reactionCounts.hasOwnProperty(reaction.content)) {
              reactionCounts[reaction.content as keyof typeof reactionCounts]++;
            }
          });

          return {
            ...comment,
            reactions: {
              ...reactionCounts,
              total_count: reactions.length,
              url: `https://api.github.com/repos/${OWNER}/${REPO}/issues/comments/${comment.id}/reactions`,
            },
          };
        } catch (error) {
          console.error(`Error fetching reactions for comment ${comment.id}:`, error);
          return comment;
        }
      })
    );

    // Formata os comentários para o formato necessário
    const formattedComments = commentsWithReactions.map((comment: any) => ({
      id: comment.id,
      body: comment.body,
      author: {
        login: comment.user.login,
        avatar_url: comment.user.avatar_url,
        html_url: comment.user.html_url,
      },
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      html_url: comment.html_url,
      reactions: comment.reactions,
    }));

    return NextResponse.json({
      success: true,
      comments: formattedComments,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar comentários' },
      { status: 500 }
    );
  }
}

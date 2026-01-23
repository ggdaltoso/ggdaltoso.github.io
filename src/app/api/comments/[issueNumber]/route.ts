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
        // Cache de 60 segundos
        next: { revalidate: 60 },
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

    // Formata os comentários para o formato necessário
    const formattedComments = comments.map((comment: any) => ({
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

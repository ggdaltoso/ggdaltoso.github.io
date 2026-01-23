import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const GITHUB_REPO = process.env.GITHUB_REPO || 'ggdaltoso/ggdaltoso.github.io';
const [OWNER, REPO] = GITHUB_REPO.split('/');

export async function POST(request: NextRequest) {
  try {
    // Verifica se o usuário está autenticado
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: 'Você precisa estar logado para comentar' },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { issueNumber, comment } = body;

    // Validações
    if (!issueNumber || !comment) {
      return NextResponse.json(
        { error: 'Issue number e comentário são obrigatórios' },
        { status: 400 },
      );
    }

    // Faz requisição ao GitHub usando o token do usuário autenticado
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/issues/${issueNumber}/comments`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Next.js Blog',
        },
        body: JSON.stringify({
          body: comment,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('GitHub API error:', error);
      return NextResponse.json(
        { error: 'Erro ao criar comentário no GitHub' },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      comment: {
        id: data.id,
        body: data.body,
        created_at: data.created_at,
        html_url: data.html_url,
      },
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar comentário' },
      { status: 500 },
    );
  }
}

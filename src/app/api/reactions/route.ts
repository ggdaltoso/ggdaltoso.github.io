import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const GITHUB_REPO = process.env.GITHUB_REPO || 'ggdaltoso/ggdaltoso.github.io';
const [OWNER, REPO] = GITHUB_REPO.split('/');

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: 'Você precisa estar logado para reagir' },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { commentId, reaction } = body;

    if (!commentId || !reaction) {
      return NextResponse.json(
        { error: 'Comment ID e reação são obrigatórios' },
        { status: 400 },
      );
    }

    // Adiciona reação ao comentário
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/issues/comments/${commentId}/reactions`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github.squirrel-girl-preview+json',
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Next.js Blog',
        },
        body: JSON.stringify({
          content: reaction,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('GitHub API error:', error);
      return NextResponse.json(
        { error: 'Erro ao adicionar reação no GitHub' },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      reaction: {
        id: data.id,
        content: data.content,
      },
    });
  } catch (error) {
    console.error('Error adding reaction:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar reação' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: 'Você precisa estar logado para remover reação' },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');
    const reactionId = searchParams.get('reactionId');

    if (!commentId || !reactionId) {
      return NextResponse.json(
        { error: 'Comment ID e Reaction ID são obrigatórios' },
        { status: 400 },
      );
    }

    // Remove reação do comentário
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/issues/comments/${commentId}/reactions/${reactionId}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/vnd.github.squirrel-girl-preview+json',
          Authorization: `Bearer ${session.accessToken}`,
          'User-Agent': 'Next.js Blog',
        },
      },
    );

    if (!response.ok && response.status !== 204) {
      const error = await response.text();
      console.error('GitHub API error:', error);
      return NextResponse.json(
        { error: 'Erro ao remover reação no GitHub' },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Error removing reaction:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar remoção de reação' },
      { status: 500 },
    );
  }
}

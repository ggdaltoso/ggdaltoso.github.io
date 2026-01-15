import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'ggdaltoso/ggdaltoso.github.io';
const [OWNER, REPO] = GITHUB_REPO.split('/');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { issueNumber, name, comment } = body;

    // Validações
    if (!issueNumber || !comment) {
      return NextResponse.json(
        { error: 'Issue number e comentário são obrigatórios' },
        { status: 400 },
      );
    }

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'Token do GitHub não configurado' },
        { status: 500 },
      );
    }

    // Monta o comentário (incluindo nome se fornecido)
    const commentBody = name ? `**${name}** comentou:\n\n${comment}` : comment;

    // Faz requisição ao GitHub para criar o comentário
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/issues/${issueNumber}/comments`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: commentBody,
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

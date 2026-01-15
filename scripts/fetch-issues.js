const fs = require('fs');
const path = require('path');
const https = require('https');

// Configurações do GitHub
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'ggdaltoso/ggdaltoso.github.io';
const [OWNER, REPO] = GITHUB_REPO.split('/');

// Diretório de destino
const POSTS_DIR = path.join(__dirname, '..', 'src', 'content', 'posts');

/**
 * Faz requisição à API do GitHub
 */
function fetchGitHub(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js',
        'Accept': 'application/vnd.github.v3+json',
        ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
      }
    };

    https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`GitHub API error: ${res.statusCode} - ${data}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Busca todas as issues do repositório
 */
async function fetchAllIssues() {
  console.log(`📡 Buscando issues do repositório ${GITHUB_REPO}...`);

  let allIssues = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const endpoint = `/repos/${OWNER}/${REPO}/issues?state=all&per_page=${perPage}&page=${page}`;
    const issues = await fetchGitHub(endpoint);

    if (issues.length === 0) break;

    // Filtrar apenas issues (não pull requests)
    const onlyIssues = issues.filter((issue) => !issue.pull_request);
    allIssues = allIssues.concat(onlyIssues);

    console.log(`   Página ${page}: ${onlyIssues.length} issues encontradas`);

    if (issues.length < perPage) break;
    page++;
  }

  console.log(`✅ Total: ${allIssues.length} issues encontradas\n`);
  return allIssues;
}

/**
 * Extrai frontmatter do corpo da issue
 */
function extractFrontmatter(body) {
  if (!body) return { frontmatter: {}, content: '' };

  // Procura por frontmatter YAML (--- ... ---)
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = body.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: body };
  }

  const [, frontmatterText, content] = match;
  const frontmatter = {};

  // Parse simples do YAML (apenas key: value)
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentValue = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('-')) {
      // Item de array
      if (currentKey && Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey].push(
          trimmedLine
            .substring(1)
            .trim()
            .replace(/^["']|["']$/g, ''),
        );
      }
    } else if (trimmedLine.includes(':')) {
      // Nova chave
      if (currentKey && currentValue.length > 0) {
        frontmatter[currentKey] = currentValue.join('\n');
        currentValue = [];
      }

      const colonIndex = trimmedLine.indexOf(':');
      currentKey = trimmedLine.substring(0, colonIndex).trim();
      let value = trimmedLine.substring(colonIndex + 1).trim();

      // Remove aspas
      value = value.replace(/^["']|["']$/g, '');

      // Verifica se é um array
      if (lines[lines.indexOf(line) + 1]?.trim().startsWith('-')) {
        frontmatter[currentKey] = [];
      } else if (value) {
        frontmatter[currentKey] = value;
        currentKey = null;
      }
    }
  }

  return { frontmatter, content: content.trim() };
}

/**
 * Converte título em slug
 */
function titleToSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]+/g, '-') // Substitui caracteres especiais por -
    .replace(/^-+|-+$/g, ''); // Remove - do início e fim
}

/**
 * Cria arquivo markdown do post
 */
function createPostFile(issue) {
  const { frontmatter, content } = extractFrontmatter(issue.body);

  // Usa slug do frontmatter ou gera a partir do título
  const slug = frontmatter.slug || titleToSlug(issue.title);
  const filename = `${slug}.md`;
  const filepath = path.join(POSTS_DIR, filename);

  // Monta frontmatter completo
  const completeFrontmatter = {
    title: frontmatter.title || issue.title,
    date: frontmatter.date || issue.created_at,
    template: frontmatter.template || 'post',
    draft:
      frontmatter.draft === 'true' || frontmatter.draft === true ? true : false,
    slug: slug,
    category: frontmatter.category || 'Uncategorized',
    tags: frontmatter.tags || [],
    description: frontmatter.description || issue.title,
    ...frontmatter,
  };

  // Monta arquivo markdown
  const lines = ['---'];

  for (const [key, value] of Object.entries(completeFrontmatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      value.forEach((item) => lines.push(`  - "${item}"`));
    } else if (typeof value === 'boolean') {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: "${value}"`);
    }
  }

  lines.push('---');
  lines.push('');
  lines.push(content);

  const fileContent = lines.join('\n');

  // Garante que o diretório existe
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  // Salva arquivo
  fs.writeFileSync(filepath, fileContent, 'utf8');

  return {
    filename,
    slug,
    draft: completeFrontmatter.draft,
  };
}

/**
 * Main
 */
async function main() {
  console.log('🚀 Iniciando geração de posts do GitHub Issues\n');

  // Valida token
  if (!GITHUB_TOKEN) {
    console.warn(
      '⚠️  AVISO: GITHUB_TOKEN não definido. A API terá limite de taxa reduzido.\n',
    );
  }

  try {
    // Busca issues
    const issues = await fetchAllIssues();

    if (issues.length === 0) {
      console.log('ℹ️  Nenhuma issue encontrada.');
      return;
    }

    // Processa cada issue
    console.log('📝 Processando issues...\n');

    let created = 0;
    let drafts = 0;

    for (const issue of issues) {
      const result = createPostFile(issue);

      if (result.draft) {
        console.log(`   ⏭️  [DRAFT] ${result.filename}`);
        drafts++;
      } else {
        console.log(`   ✅ ${result.filename}`);
        created++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Concluído!`);
    console.log(`   Posts criados: ${created}`);
    console.log(`   Rascunhos: ${drafts}`);
    console.log(`   Total: ${created + drafts}`);
    console.log('='.repeat(50) + '\n');
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executa
main();

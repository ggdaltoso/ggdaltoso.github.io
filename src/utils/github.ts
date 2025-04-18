import { Octokit } from '@octokit/rest';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const CACHE_FILE = path.resolve('./src/data/github-issues.json');

const octokit = new Octokit({
  auth:
    process.env.GITHUB_TOKEN ||
    import.meta.env.GITHUB_TOKEN ||
    (() => {
      throw new Error('GITHUB_TOKEN is not defined');
    })(),
});

type Frontmatter = {
  title: string;
  date: Date;
  draft: boolean;
  slug: string;
  category: string;
  tags: string[];
  description: string;
};

type Post = Awaited<
  ReturnType<typeof octokit.issues.listForRepo>
>['data'][number] & {
  frontmatter: Frontmatter;
} & Pick<ReturnType<typeof matter>, 'content'>;

export async function fetchGitHubIssues(): Promise<Post[]> {
  try {
    // Check if cached data exists
    const cachedData = await fs.readFile(CACHE_FILE, 'utf-8');
    return JSON.parse(cachedData);
  } catch {
    // Fetch issues from GitHub
    const { data } = await octokit.issues.listForRepo({
      owner: 'ggdaltoso',
      repo: 'ggdaltoso.github.io',
      state: 'open',
      per_page: 100,
    });

    const issues = data.filter((issue) => !issue.pull_request);

    const withFrontmatter = issues.map((issue) => {
      const { data, content } = matter(issue.body || '');

      return {
        ...issue,
        frontmatter: data as Frontmatter,
        content,
      };
    });

    const noDraftIssues = withFrontmatter.filter(
      (issue) => issue.frontmatter.draft !== true,
    );

    const sortedIssues = noDraftIssues.sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });

    // Cache the data locally
    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
    await fs.writeFile(CACHE_FILE, JSON.stringify(withFrontmatter, null, 2));

    return sortedIssues;
  }
}

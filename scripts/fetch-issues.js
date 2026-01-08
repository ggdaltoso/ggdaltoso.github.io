const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const GITHUB_OWNER = 'ggdaltoso';
const GITHUB_REPO = 'ggdaltoso.github.io';
const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional token to avoid rate limit

/**
 * Fetch all issues from the repository
 */
async function fetchIssues() {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues?state=all&per_page=100`;

  console.log('Fetching issues from GitHub...');

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Blog-CMS-Script',
      ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
    },
  });

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}: ${await response.text()}`,
    );
  }

  const issues = await response.json();

  // Filter only issues (not pull requests)
  return issues.filter((issue) => !issue.pull_request);
}

/**
 * Convert an issue to blog post format
 */
function issueToPost(issue) {
  if (!issue.body) {
    throw new Error(
      `Issue #${issue.number ?? 'unknown'} (${
        issue.title ?? 'untitled'
      }) has an empty body`,
    );
  }

  // Parse frontmatter from issue body using gray-matter
  const parsed = matter(issue.body);
  const frontmatter = parsed.data;

  // Extract slug from frontmatter
  let slug = null;
  if (frontmatter.slug) {
    slug = frontmatter.slug.replace(/^\//, ''); // Remove leading slash
  }

  // If no slug found, create from title
  const finalSlug =
    slug ||
    issue.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove duplicate hyphens
      .trim();

  // Use date from frontmatter or fallback to issue creation date
  let datePrefix;
  if (frontmatter.date) {
    const postDate = new Date(frontmatter.date);
    datePrefix = postDate.toISOString().split('T')[0];
  } else {
    const createdDate = new Date(issue.created_at);
    datePrefix = createdDate.toISOString().split('T')[0];
  }

  // File name
  const filename = `${datePrefix}---${finalSlug}.md`;
  const content = issue.body;

  return {
    filename,
    content,
    issue,
  };
}

/**
 * Save post to file
 */
function savePost(post) {
  const filepath = path.join(POSTS_DIR, post.filename);

  // Create directory if it doesn't exist
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  fs.writeFileSync(filepath, post.content, 'utf8');
  console.log(`✓ Post created: ${post.filename}`);
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('=== Fetch GitHub Issues to Blog Posts ===\n');

    // Fetch issues
    const issues = await fetchIssues();
    console.log(`Found ${issues.length} issues\n`);

    if (issues.length === 0) {
      console.log('No issues found to process.');
      return;
    }

    // Process each issue
    let created = 0;
    let skipped = 0;

    for (const issue of issues) {
      try {
        const post = issueToPost(issue);
        const filepath = path.join(POSTS_DIR, post.filename);

        // Check if file already exists
        if (fs.existsSync(filepath)) {
          console.log(`⊘ Skipping (already exists): ${post.filename}`);
          skipped++;
        } else {
          savePost(post);
          created++;
        }
      } catch (err) {
        console.error(`Error processing issue #${issue.number}:`, err.message);
      }
    }

    console.log(`\n=== Summary ===`);
    console.log(`Posts created: ${created}`);
    console.log(`Posts skipped: ${skipped}`);
    console.log(`Total issues: ${issues.length}`);
  } catch (error) {
    console.error('Error fetching issues:', error.message);
    process.exit(1);
  }
}

// Run the script
main();

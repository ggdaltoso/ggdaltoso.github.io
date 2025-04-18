import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fetchGitHubIssues } from '../src/utils/github';

const OUTPUT_DIR = path.resolve('./src/content/posts');

async function generatePosts() {
  try {
    // Fetch issues from GitHub or cache
    const issues = await fetchGitHubIssues();

    // Ensure the output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Generate a file for each issue
    for (const issue of issues) {
      const { body, frontmatter } = issue;

      if (!body) {
        console.error(`No body found for issue: ${issue.title}`);
        continue;
      }

      // Define the file path using the slug
      const filePath = path.join(OUTPUT_DIR, `${frontmatter.slug}.md`);

      // Write the file
      await fs.writeFile(filePath, body, 'utf-8');
      console.log(`Generated: ${filePath}`);
    }

    console.log('All posts have been generated successfully!');
  } catch (error) {
    console.error('Error generating posts:', error);
  }
}

generatePosts();

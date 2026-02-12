'use strict';

const fs = require('fs');
const path = require('path');
const siteConfig = require('../config.js');

module.exports = async (graphql, reporter) => {
  reporter.info('Generating llms.txt...');

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { template: { eq: "post" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              description
              date
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.error('Error querying posts for llms.txt', result.errors);
    throw result.errors;
  }

  const posts = result.data.allMarkdownRemark.edges;
  reporter.info(`Found ${posts.length} posts to include in llms.txt`);

  // Generate llms.txt content
  const llmsTxtContent = generateLlmsTxt(posts, reporter);

  // Write file to public directory
  const outputPath = path.join(__dirname, '../public/llms.txt');
  fs.writeFileSync(outputPath, llmsTxtContent, 'utf-8');

  reporter.success(`llms.txt generated successfully at ${outputPath}`);
};

function generateLlmsTxt(posts, reporter) {
  const lines = [];

  // H1: Project name (required)
  lines.push(`# ${siteConfig.title}`);
  lines.push('');

  // Blockquote: Short summary (required)
  lines.push(`> ${siteConfig.subtitle}`);
  lines.push('');

  // Optional details section (free-form markdown)
  lines.push(
    `Este é o blog pessoal de ${siteConfig.author.name}, onde compartilho artigos sobre desenvolvimento de software, tecnologia e projetos pessoais.`,
  );
  lines.push('');

  // Contact information
  const contacts = [];
  if (siteConfig.author.contacts.email) {
    contacts.push(`email: ${siteConfig.author.contacts.email}`);
  }
  if (siteConfig.author.contacts.twitter) {
    contacts.push(`Twitter: @${siteConfig.author.contacts.twitter}`);
  }
  if (siteConfig.author.contacts.github) {
    contacts.push(`GitHub: ${siteConfig.author.contacts.github}`);
  }
  if (contacts.length > 0) {
    lines.push(`Contatos: ${contacts.join(', ')}`);
    lines.push('');
  }

  // H2 section with file list (link format required)
  lines.push('## Artigos');
  lines.push('');

  posts.forEach(({ node }) => {
    const { slug } = node.fields;
    const { title, description, date } = node.frontmatter;
    const url = `${siteConfig.url}/posts${slug}`;

    reporter.info(`   - Adding post: ${title}`);

    // Format: - [Link title](url): Optional details
    const dateStr = new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    if (description) {
      lines.push(`- [${title}](${url}): ${description} (${dateStr})`);
    } else {
      lines.push(`- [${title}](${url}): Publicado em ${dateStr}`);
    }
  });

  lines.push('');

  return lines.join('\n');
}

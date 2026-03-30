'use strict';

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage, registerFont } = require('canvas');
const siteConfig = require('../config.js');

// Configuration for OG image generation
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const TEMPLATE_PATH = path.join(__dirname, '../static/og-image/template.png');
const OUTPUT_DIR = path.join(__dirname, '../public/og-images');
const DEFAULT_LOCALE = siteConfig.i18n?.defaultLocale || 'pt';
const REACT95_GLOBAL_STYLE_CSS_PATH = path.join(
  __dirname,
  '../node_modules/@react95/core/esm/GlobalStyle/GlobalStyle.css.ts.vanilla.css',
);
const OG_FONT_FAMILY = 'MS Sans Serif';
const OG_FONT_FAMILY_CSS = '"MS Sans Serif"';

let ogFontsLoaded = false;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function loadReact95OGFonts(reporter) {
  if (ogFontsLoaded) return;

  if (!fs.existsSync(REACT95_GLOBAL_STYLE_CSS_PATH)) {
    reporter.warn(
      `React95 GlobalStyle CSS not found at "${REACT95_GLOBAL_STYLE_CSS_PATH}". Falling back to system fonts.`,
    );
    ogFontsLoaded = true;
    return;
  }

  const css = fs.readFileSync(REACT95_GLOBAL_STYLE_CSS_PATH, 'utf8');
  const fontFaceBlocks = [...css.matchAll(/@font-face\s*\{([\s\S]*?)\}/g)].map(
    (match) => match[1],
  );

  const fontOutputDir = path.join(process.cwd(), '.cache', 'og-fonts');
  if (!fs.existsSync(fontOutputDir)) {
    fs.mkdirSync(fontOutputDir, { recursive: true });
  }

  let registeredFonts = 0;

  fontFaceBlocks.forEach((block, index) => {
    const familyMatch = block.match(/font-family:\s*([^;]+);/);
    if (!familyMatch) return;

    const family = familyMatch[1].trim().replace(/^['"]|['"]$/g, '');
    if (family !== OG_FONT_FAMILY) return;

    const ttfMatch = block.match(/data:font\/ttf;base64,([A-Za-z0-9+/=]+)/);
    if (!ttfMatch) return;

    const weightMatch = block.match(/font-weight:\s*([^;]+);/);
    const weight = (weightMatch ? weightMatch[1] : 'normal').trim();
    const safeWeight = weight.replace(/\s+/g, '-').toLowerCase();
    const fontFilePath = path.join(
      fontOutputDir,
      `react95-ms-sans-serif-${safeWeight}-${index}.ttf`,
    );

    fs.writeFileSync(fontFilePath, Buffer.from(ttfMatch[1], 'base64'));
    registerFont(fontFilePath, { family: OG_FONT_FAMILY, weight });
    registeredFonts += 1;
  });

  if (registeredFonts === 0) {
    reporter.warn(
      `No embedded "${OG_FONT_FAMILY}" TTF was found in React95 GlobalStyle. Falling back to system fonts.`,
    );
  }

  ogFontsLoaded = true;
}

/**
 * Generates an OG image for a given post/page
 * @param {Object} data - Post/page data
 */
async function generateOGImage(data) {
  const { title, description, date, readingTime, locale = 'pt', slug } = data;

  const isPage = data.template === 'page';

  try {
    const canvas = createCanvas(OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT);
    const ctx = canvas.getContext('2d');

    // Load and draw template
    const templateImage = await loadImage(TEMPLATE_PATH);
    ctx.drawImage(templateImage, 0, 0, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT);

    // Define content area (left side black area)
    const contentPadding = 24;
    const contentX = contentPadding;
    const contentMaxWidth = 600;

    // TITLE AND DESCRIPTION (Top-left)
    ctx.fillStyle = '#ffffff';
    ctx.font = isPage
      ? `bold 72px ${OG_FONT_FAMILY_CSS}`
      : `bold 60px ${OG_FONT_FAMILY_CSS}`;
    ctx.textBaseline = 'top';

    // Wrap title text
    const words = title.split(' ');
    let lines = [];
    let currentLine = '';

    words.forEach((word) => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > contentMaxWidth) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) lines.push(currentLine);

    let yOffset = 20;
    const titleLineHeight = isPage ? 72 : 64;
    lines.forEach((line) => {
      ctx.fillText(line, contentX, yOffset);
      yOffset += titleLineHeight;
    });

    // Draw description with proper wrapping
    if (description) {
      ctx.fillStyle = '#d0d0d0';
      ctx.font = `28px ${OG_FONT_FAMILY_CSS}`;

      // Wrap description text properly
      const descWords = description.split(' ');
      let descLines = [];
      let descCurrentLine = '';

      descWords.forEach((word) => {
        const testLine = descCurrentLine + (descCurrentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > contentMaxWidth) {
          if (descCurrentLine) descLines.push(descCurrentLine);
          descCurrentLine = word;
        } else {
          descCurrentLine = testLine;
        }
      });
      if (descCurrentLine) descLines.push(descCurrentLine);

      let descYOffset = yOffset + 60;
      const descLineHeight = 38;
      // Show max 2 lines of description
      descLines.forEach((line) => {
        ctx.fillText(line, contentX, descYOffset);
        descYOffset += descLineHeight;
      });
    }

    // FOOTER INFO (Bottom-left)
    // Accent line
    ctx.strokeStyle = '#5e35b1';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(20, OG_IMAGE_HEIGHT - 110);
    ctx.lineTo(200, OG_IMAGE_HEIGHT - 110);
    ctx.stroke();

    const formattedDate = date
      ? new Date(date).toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          timeZone: 'UTC',
        })
      : '';

    const readingTimeText = readingTime
      ? locale === 'pt'
        ? `${Math.ceil(readingTime)} min de leitura`
        : `${Math.ceil(readingTime)} min read`
      : '';

    ctx.fillStyle = '#e0e0e0';
    ctx.font = `bold 24px ${OG_FONT_FAMILY_CSS}`;
    ctx.fillText(siteConfig.title, contentX, OG_IMAGE_HEIGHT - 104);

    const footerItems = [formattedDate, readingTimeText].filter(Boolean);
    const footerText = footerItems.join(' • ');

    ctx.fillStyle = '#e0e0e0';
    ctx.font = `20px ${OG_FONT_FAMILY_CSS}`;
    ctx.fillText(footerText, contentX, OG_IMAGE_HEIGHT - 50);

    // Save image in locale-specific folder
    const cleanSlug = slug
      .replace(/^\//g, '')
      .replace(/\/$/, '')
      .replace(/\//g, '-');
    const localeFolder = locale || DEFAULT_LOCALE;
    const localeOutputDir = path.join(OUTPUT_DIR, localeFolder);
    if (!fs.existsSync(localeOutputDir)) {
      fs.mkdirSync(localeOutputDir, { recursive: true });
    }

    const imagePath = path.join(localeOutputDir, `${cleanSlug}.png`);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(imagePath, buffer);

    return {
      slug,
      imagePath: `/og-images/${localeFolder}/${cleanSlug}.png`,
      success: true,
    };
  } catch (error) {
    console.error(`Error generating OG image for ${slug}:`, error);
    return {
      slug,
      success: false,
      error: error.message,
    };
  }
}

/**
 * Generates OG images for all posts and pages
 */
async function generateAllOGImages(graphql, reporter) {
  reporter.info('🖼️  Generating Open Graph images...');
  loadReact95OGFonts(reporter);

  try {
    const result = await graphql(`
      {
        allMarkdownRemark(filter: { frontmatter: { draft: { ne: true } } }) {
          nodes {
            fields {
              locale
            }
            frontmatter {
              title
              description
              date
              slug
              template
            }
            readingTime {
              minutes
            }
          }
        }
      }
    `);

    if (result.errors) {
      reporter.error('Error querying markdown files:', result.errors);
      return;
    }

    const { nodes } = result.data.allMarkdownRemark;
    const results = [];

    // Generate images for posts and pages
    const contentNodes = nodes.filter((node) => {
      const template = node.frontmatter?.template;
      return template === 'post' || template === 'page';
    });

    for (const node of contentNodes) {
      const { locale } = node.fields || {};
      const { title, description, date, slug, template } =
        node.frontmatter || {};
      const readingTime =
        template === 'post' ? node.readingTime?.minutes || 0 : 0;

      if (slug && title) {
        // Normalize slug: remove leading/trailing slashes
        const normalizedSlug = slug.trim('/');
        const result = await generateOGImage({
          slug: normalizedSlug,
          title,
          description,
          date,
          readingTime,
          locale: locale || 'pt',
          template,
        });
        results.push(result);
      }
    }

    // Generate home OG image per locale
    const locales = siteConfig.i18n?.locales || ['pt'];
    const defaultLocale = siteConfig.i18n?.defaultLocale || 'pt';

    for (const locale of locales) {
      const homeTitle = siteConfig.title;
      const homeDescription =
        (siteConfig.subtitle && siteConfig.subtitle[locale]) ||
        siteConfig.subtitle?.[defaultLocale] ||
        '';

      const homeResult = await generateOGImage({
        slug: 'home',
        title: homeTitle,
        description: homeDescription,
        locale,
        template: 'page',
      });
      results.push(homeResult);
    }

    // Report results
    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    reporter.success(
      `✅ Generated ${successful} OG images${failed > 0 ? ` (${failed} failed)` : ''}`,
    );

    return {
      successful,
      failed,
      results,
    };
  } catch (error) {
    reporter.error('Failed to generate OG images:', error);
  }
}

module.exports = generateAllOGImages;

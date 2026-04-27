import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import Layout from '@components/Layout';
import Post from '@components/Post';
import SEO from '@components/SEO';
import GGImage from '@components/Layout/Image';
import GGHighlight from '@components/Layout/Highlight';
import siteConfig from '@config';
import { buildDocumentTitle, getLocalizedValue } from '@utils';

const mdxComponents = {
  img: ({ src, alt, title }) => (
    <GGImage src={src} alt={alt} title={title || alt} />
  ),
  pre: ({ children }) => {
    const code = children?.props?.children || '';
    const className = children?.props?.className || '';
    const language = className.replace('language-', '') || 'text';
    return (
      <GGHighlight
        code={typeof code === 'string' ? code.trimEnd() : ''}
        language={language}
      />
    );
  },
};

const PostTemplateMDX = ({ data, children }) => {
  return (
    <Layout>
      <Post post={data.mdx} mdxContent={<MDXProvider components={mdxComponents}>{children}</MDXProvider>} />
    </Layout>
  );
};

export const Head = ({ data, pageContext }) => {
  const defaultLocale = siteConfig.i18n?.defaultLocale || 'pt';
  const locale = pageContext.locale || defaultLocale;
  const { title, description, slug } = data.mdx.frontmatter;

  return (
    <SEO
      locale={locale}
      title={buildDocumentTitle(title)}
      description={
        description ||
        getLocalizedValue(siteConfig.subtitle, locale, defaultLocale)
      }
      slug={slug}
    />
  );
};

export const query = graphql`
  query PostByIdMDX($id: String!, $locale: String!) {
    locales: allLocale(filter: { language: { eq: $locale } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    mdx(id: { eq: $id }) {
      id
      readingTime {
        minutes
      }
      frontmatter {
        date
        description
        title
        slug
      }
    }
  }
`;

export default PostTemplateMDX;

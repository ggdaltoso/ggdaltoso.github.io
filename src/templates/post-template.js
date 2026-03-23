import React from 'react';
import { graphql } from 'gatsby';
import Layout from '@components/Layout';
import Post from '@components/Post';
import SEO from '@components/SEO';
import siteConfig from '@config';
import { buildDocumentTitle, getLocalizedValue } from '@utils';

const PostTemplate = ({ data }) => {
  const { html: postBody } = data.markdownRemark;

  return (
    <Layout>
      <Post post={data.markdownRemark} html={postBody} />
    </Layout>
  );
};

export const Head = ({ data, pageContext }) => {
  const defaultLocale = siteConfig.i18n?.defaultLocale || 'pt';
  const locale = pageContext.locale || defaultLocale;
  const { title, description, slug } = data.markdownRemark.frontmatter;

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
  query PostById($id: String!, $locale: String!) {
    locales: allLocale(filter: { language: { eq: $locale } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
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

export default PostTemplate;

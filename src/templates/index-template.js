import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import SEO from '../components/SEO';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import siteConfig from '../../config.js';
import { buildDocumentTitle, getLocalizedValue } from '../utils';

const IndexTemplate = ({ data, pageContext }) => {
  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath,
  } = pageContext;

  const { edges } = data.allMarkdownRemark;
  const pageTitle = buildDocumentTitle(
    currentPage > 0 ? `Posts - Page ${currentPage}` : '',
  );

  return (
    <Layout>
      <Sidebar isIndex />
      <Page>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </Layout>
  );
};

export const Head = ({ pageContext }) => {
  const defaultLocale = siteConfig.i18n?.defaultLocale || 'pt';
  const locale = pageContext.locale || defaultLocale;
  const pageTitle =
    pageContext.currentPage > 0
      ? locale === 'en'
        ? `Posts - Page ${pageContext.currentPage}`
        : `Posts - Pagina ${pageContext.currentPage}`
      : '';

  return (
    <SEO
      locale={locale}
      title={buildDocumentTitle(pageTitle)}
      description={getLocalizedValue(siteConfig.subtitle, locale, defaultLocale)}
    />
  );
};

export const query = graphql`
  query IndexTemplate($locale: String!, $postsLimit: Int!, $postsOffset: Int!) {
    locales: allLocale(filter: { language: { eq: $locale } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allMarkdownRemark(
      limit: $postsLimit
      skip: $postsOffset
      filter: {
        frontmatter: { template: { eq: "post" }, draft: { ne: true } }
        fields: { locale: { eq: $locale } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
          }
        }
      }
    }
  }
`;

export default IndexTemplate;

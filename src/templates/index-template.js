import React from 'react';
import { graphql } from 'gatsby';
import Layout from '@components/Layout';
import Sidebar from '@components/Sidebar';
import SEO from '@components/SEO';
import Feed from '@components/Feed';
import Page from '@components/Page';
import siteConfig from '@config';
import { buildDocumentTitle, getLocalizedValue } from '@utils';

const IndexTemplate = ({ data }) => (
  <Layout>
    <Sidebar isIndex />
    <Page>
      <Feed edges={data.allMdx.edges} />
    </Page>
  </Layout>
);

export const Head = ({ pageContext }) => {
  const defaultLocale = siteConfig.i18n?.defaultLocale || 'pt';
  const locale = pageContext.locale || defaultLocale;

  return (
    <SEO
      locale={locale}
      title={buildDocumentTitle('')}
      description={getLocalizedValue(siteConfig.subtitle, locale, defaultLocale)}
      slug={locale === defaultLocale ? '/' : `/${locale}/`}
    />
  );
};

export const query = graphql`
  query IndexTemplate($locale: String!) {
    locales: allLocale(filter: { language: { eq: $locale } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allMdx(
      filter: {
        frontmatter: { template: { eq: "post" }, draft: { ne: true } }
        fields: { locale: { eq: $locale } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          readingTime {
            minutes
          }
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

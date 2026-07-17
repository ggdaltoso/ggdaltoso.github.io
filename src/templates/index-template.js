import React from 'react';
import { graphql } from 'gatsby';
import Layout from '@components/Layout/Layout';
import Sidebar from '@components/Sidebar/Sidebar';
import Seo from '@components/SEO/SEO';
import Feed from '@components/Feed/Feed';
import Page from '@components/Page/Page';
import siteConfig from '@config';
import buildDocumentTitle from '@utils/build-document-title';
import { getLocalizedValue } from '@utils/i18n';

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
    <Seo
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

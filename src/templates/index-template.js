import React from 'react';
import { graphql } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import { useSiteMetadata } from '../hooks';
import { getLocalizedValue } from '../utils';

const IndexTemplate = ({ data, pageContext }) => {
  const { title: siteTitle, subtitle } = useSiteMetadata();
  const { language, defaultLanguage } = useI18next();
  const siteSubtitle = getLocalizedValue(subtitle, language, defaultLanguage);

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath,
  } = pageContext;

  const { edges } = data.allMarkdownRemark;
  const pageTitle =
    currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
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

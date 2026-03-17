import React from 'react';
import { graphql } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import Content from '../components/Post/Content';
import { useSiteMetadata } from '../hooks';
import { getLocalizedValue } from '../utils';

const PageTemplate = ({ data }) => {
  const { title: siteTitle, subtitle } = useSiteMetadata();
  const { language, defaultLanguage } = useI18next();
  const siteSubtitle = getLocalizedValue(subtitle, language, defaultLanguage);
  const { html: pageBody } = data.markdownRemark;
  const {
    title: pageTitle,
    description: pageDescription,
  } = data.markdownRemark.frontmatter;
  const metaDescription =
    pageDescription !== null ? pageDescription : siteSubtitle;

  return (
    <Layout title={`${siteTitle} - ${pageTitle}`} description={metaDescription}>
      <Sidebar />
      <Page>
        <Content title={pageTitle} body={pageBody} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query PageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date
        description
      }
    }
  }
`;

export default PageTemplate;

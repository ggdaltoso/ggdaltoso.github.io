import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import Content from '../components/Post/Content';
import { useLocalizedSiteMetadata } from '../hooks';
import { buildDocumentTitle } from '../utils';

const PageTemplate = ({ data }) => {
  const { localizedSubtitle } = useLocalizedSiteMetadata();
  const { html: pageBody } = data.markdownRemark;
  const {
    title: pageTitle,
    description: pageDescription,
  } = data.markdownRemark.frontmatter;
  const metaDescription =
    pageDescription !== null ? pageDescription : localizedSubtitle;

  return (
    <Layout
      title={buildDocumentTitle(pageTitle)}
      description={metaDescription}
    >
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

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import Content from '../components/Post/Content';
import SEO from '../components/SEO';
import siteConfig from '../../config.js';
import { buildDocumentTitle, getLocalizedValue } from '../utils';

const PageTemplate = ({ data }) => {
  const { html: pageBody } = data.markdownRemark;
  const { title: pageTitle } = data.markdownRemark.frontmatter;

  return (
    <Layout>
      <Sidebar />
      <Page>
        <Content title={pageTitle} body={pageBody} />
      </Page>
    </Layout>
  );
};

export const Head = ({ data, pageContext }) => {
  const defaultLocale = siteConfig.i18n?.defaultLocale || 'pt';
  const locale = pageContext.locale || defaultLocale;
  const { title, description } = data.markdownRemark.frontmatter;

  return (
    <SEO
      locale={locale}
      title={buildDocumentTitle(title)}
      description={
        description || getLocalizedValue(siteConfig.subtitle, locale, defaultLocale)
      }
    />
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

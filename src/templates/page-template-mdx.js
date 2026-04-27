import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import Layout from '@components/Layout';
import Sidebar from '@components/Sidebar';
import Page from '@components/Page';
import Content from '@components/Post/Content';
import SEO from '@components/SEO';
import siteConfig from '@config';
import { buildDocumentTitle, getLocalizedValue } from '@utils';

const PageTemplateMDX = ({ data, children }) => {
  return (
    <Layout>
      <Sidebar />
      <Page>
        <Content title={data.mdx.frontmatter.title}>
          <MDXProvider>{children}</MDXProvider>
        </Content>
      </Page>
    </Layout>
  );
};

export const Head = ({ data, pageContext }) => {
  const defaultLocale = siteConfig.i18n?.defaultLocale || 'pt';
  const locale = pageContext.locale || defaultLocale;
  const { title, slug } = data.mdx.frontmatter;

  return (
    <SEO
      locale={locale}
      title={buildDocumentTitle(title)}
      description={getLocalizedValue(siteConfig.subtitle, locale, defaultLocale)}
      slug={slug}
    />
  );
};

export const query = graphql`
  query PageByIdMDX($id: String!, $locale: String!) {
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
      frontmatter {
        title
        slug
      }
    }
  }
`;

export default PageTemplateMDX;

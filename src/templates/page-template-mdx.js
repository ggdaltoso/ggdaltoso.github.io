import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import Layout from '@components/Layout/Layout';
import Sidebar from '@components/Sidebar/Sidebar';
import Page from '@components/Page/Page';
import Content from '@components/Post/Content/Content';
import Seo from '@components/SEO/SEO';
import GGImage from '@components/Layout/Image';
import siteConfig from '@config';
import buildDocumentTitle from '@utils/build-document-title';
import { getLocalizedValue } from '@utils/i18n';

const mdxComponents = {
  img: ({ src, alt, title }) => (
    <GGImage src={src} alt={alt} title={title || alt} />
  ),
};

const PageTemplateMDX = ({ data, children }) => (
    <Layout>
      <Sidebar />
      <Page>
        <Content title={data.mdx.frontmatter.title}>
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </Content>
      </Page>
    </Layout>
  );

export const Head = ({ data, pageContext }) => {
  const defaultLocale = siteConfig.i18n?.defaultLocale || 'pt';
  const locale = pageContext.locale || defaultLocale;
  const { title, slug } = data.mdx.frontmatter;

  return (
    <Seo
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

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useLocalizedSiteMetadata } from '../hooks';

const PostTemplate = ({ data }) => {
  const { title: siteTitle, localizedSubtitle } = useLocalizedSiteMetadata();
  const { html: postBody } = data.markdownRemark;
  const { title: postTitle, description: postDescription } =
    data.markdownRemark.frontmatter;
  const metaDescription =
    postDescription !== null ? postDescription : localizedSubtitle;

  return (
    <Layout title={`${siteTitle} - ${postTitle}`} description={metaDescription}>
      <Post post={data.markdownRemark} html={postBody} />
    </Layout>
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
      fields {
        slug
      }
      frontmatter {
        date
        description
        title
      }
    }
  }
`;

export default PostTemplate;

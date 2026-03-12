import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          author {
            name
            bio
            photo
            contacts {
              email
              bluesky
              github
              rss
            }
          }
          menu {
            label
            path
          }
          url
          title
          subtitle
        }
      }
    }
  `);

  return site.siteMetadata;
};

export default useSiteMetadata;

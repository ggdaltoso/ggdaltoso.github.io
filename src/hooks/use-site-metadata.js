import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author {
              name
              bio
              photo
              contacts {
                email
                twitter
                github
              }
            }
            menu {
              label
              path
            }
            url
            title
            subtitle
            copyright
          }
        }
      }
    `,
  );

  return site.siteMetadata;
};

export default useSiteMetadata;

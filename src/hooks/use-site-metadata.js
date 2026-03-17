import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          author {
            name
            bio {
              pt
              en
            }
            photo
            contacts {
              email
              bluesky
              github
              rss
            }
          }
          menu {
            pt {
              label
              path
            }
            en {
              label
              path
            }
          }
          i18n {
            defaultLocale
            locales
            pages {
              about {
                pt
                en
              }
            }
            paths {
              pt {
                tags
                category
                categories
                page
              }
              en {
                tags
                category
                categories
                page
              }
            }
          }
          url
          title
          subtitle {
            pt
            en
          }
        }
      }
    }
  `);

  return site.siteMetadata;
};

export default useSiteMetadata;

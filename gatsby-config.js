'use strict';

const siteConfig = require('./config.js');
const postCssPlugins = require('./postcss-config.js');

module.exports = {
  siteMetadata: {
    url: siteConfig.url,
    title: siteConfig.title,
    subtitle: siteConfig.subtitle,
    defaultDescription: siteConfig.subtitle.pt,
    i18n: siteConfig.i18n,
    menu: siteConfig.menu,
    author: siteConfig.author,
    giscus: siteConfig.giscus,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/locales`,
        name: 'locale',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/media`,
        name: 'media',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: 'gatsby-alias-imports',
      options: {
        aliases: {
          '@components': 'src/components',
          '@constants': 'src/constants',
          '@hooks': 'src/hooks',
          '@utils': 'src/utils',
          '@config': 'config.js',
          '@plugins': 'plugins',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                site_url: url
                title
                description: defaultDescription
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map((edge) =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.site_url + edge.node.fields.slug,
                  guid: site.siteMetadata.site_url + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                }),
              ),
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { frontmatter: { date: DESC } },
                  filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        template
                        draft
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Blog do GG - RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: 'locale',
        languages: siteConfig.i18n.locales,
        defaultLanguage: siteConfig.i18n.defaultLocale,
        redirect: false,
        siteUrl: siteConfig.url,
        i18nextOptions: {
          interpolation: {
            escapeValue: false,
          },
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [
          {
            matchPath: '/:lang?/:uid*',
            getLanguageFromPath: true,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: { maxWidth: 960, showCaptions: true },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [siteConfig.googleAnalyticsId],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            allSitePage (
              filter: {
                path: { regex: "/^(?!/404|/404.html|/dev-404-page/)/" }
              }
            ) {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: () => siteConfig.url,
        serialize: ({ path }) => ({
          url: siteConfig.url + path,
          changefreq: 'daily',
          priority: 0.7,
        }),
        resolvePages: ({ allSitePage: { nodes: allPages } }) =>
          allPages.map((page) => page),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteConfig.title,
        short_name: siteConfig.title,
        start_url: '/',
        background_color: '#FFF',
        theme_color: '#5e35b1',
        display: 'standalone',
        icon: 'static/photo.jpg',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        },
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [...postCssPlugins],
        cssLoaderOptions: {
          camelCase: false,
        },
        sassOptions: {
          api: 'modern',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-plugin-giscus',
    },
  ],
};

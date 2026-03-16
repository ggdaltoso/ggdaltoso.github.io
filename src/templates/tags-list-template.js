import React from 'react';
import { graphql, Link } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';
import { getLocalePaths, getLocalizedValue, withLocalePath } from '../utils';

const TagsListTemplate = ({ data, pageContext }) => {
  const { title, subtitle } = useSiteMetadata();
  const { language, defaultLanguage } = useI18next();
  const localizedSubtitle = getLocalizedValue(subtitle, language, defaultLanguage);
  const { t } = useTranslation();
  const { locale } = pageContext;
  const localePaths = getLocalePaths(data.site.siteMetadata, locale);
  const tags = data.allMarkdownRemark.group;

  return (
    <Layout title={`${t('Tags')} - ${title}`} description={localizedSubtitle}>
      <Sidebar />
      <Page title={t('Tags')}>
        <ul>
          {tags.map((tag) => (
            <li key={tag.fieldValue}>
              <Link
                to={withLocalePath(
                  `/${localePaths.tags}/${kebabCase(tag.fieldValue)}/`,
                  locale,
                  data.site.siteMetadata.i18n.defaultLocale,
                )}
              >
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query TagsListTemplate($locale: String!) {
    site {
      siteMetadata {
        i18n {
          defaultLocale
          paths {
            pt {
              tags
            }
            en {
              tags
            }
          }
        }
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { template: { eq: "post" }, draft: { ne: true } }
        fields: { locale: { eq: $locale } }
      }
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagsListTemplate;

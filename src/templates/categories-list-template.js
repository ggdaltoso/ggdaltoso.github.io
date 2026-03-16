import React from 'react';
import { graphql, Link } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import kebabCase from 'lodash/kebabCase';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';
import { getLocalePaths, getLocalizedValue, withLocalePath } from '../utils';

const CategoriesListTemplate = ({ data, pageContext }) => {
  const { title, subtitle } = useSiteMetadata();
  const { language, defaultLanguage } = useI18next();
  const localizedSubtitle = getLocalizedValue(subtitle, language, defaultLanguage);
  const { t } = useTranslation();
  const { locale } = pageContext;
  const localePaths = getLocalePaths(data.site.siteMetadata, locale);
  const categories = data.allMarkdownRemark.group;

  return (
    <Layout title={`${t('Categories')} - ${title}`} description={localizedSubtitle}>
      <Sidebar />
      <Page title={t('Categories')}>
        <ul>
          {categories.map((category) => (
            <li key={category.fieldValue}>
              <Link
                to={withLocalePath(
                  `/${localePaths.category}/${kebabCase(category.fieldValue)}/`,
                  locale,
                  data.site.siteMetadata.i18n.defaultLocale,
                )}
              >
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query CategoriesListTemplate($locale: String!) {
    site {
      siteMetadata {
        i18n {
          defaultLocale
          paths {
            pt {
              category
            }
            en {
              category
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
      group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default CategoriesListTemplate;

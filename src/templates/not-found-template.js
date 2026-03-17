import React from 'react';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import SEO from '../components/SEO';
import siteConfig from '../../config.js';
import { buildDocumentTitle } from '../utils';

const NotFoundTemplate = () => {
  const { language } = useI18next();
  const { t } = useTranslation();

  const notFoundTitle = t('Not found');
  const notFoundDescription =
    language === 'en'
      ? 'The route you tried to access does not exist.'
      : 'A rota que voce tentou acessar nao existe.';

  return (
    <Layout>
      <Sidebar />
      <Page title={notFoundTitle}>
        <p>{notFoundDescription}</p>
      </Page>
    </Layout>
  );
};

export const Head = ({ pageContext }) => {
  const locale = pageContext.locale || siteConfig.i18n?.defaultLocale || 'pt';
  const notFoundTitle = locale === 'en' ? 'Not found' : 'Pagina nao encontrada';
  const notFoundDescription =
    locale === 'en'
      ? 'The route you tried to access does not exist.'
      : 'A rota que voce tentou acessar nao existe.';

  return (
    <SEO
      locale={locale}
      title={buildDocumentTitle(notFoundTitle)}
      description={notFoundDescription}
    />
  );
};

export default NotFoundTemplate;

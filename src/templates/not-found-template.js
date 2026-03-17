import React from 'react';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useLocalizedSiteMetadata } from '../hooks';

const NotFoundTemplate = () => {
  const { title, localizedSubtitle } = useLocalizedSiteMetadata();
  const { language } = useI18next();
  const { t } = useTranslation();

  const notFoundTitle = t('Not found');
  const notFoundDescription =
    language === 'en'
      ? 'The route you tried to access does not exist.'
      : 'A rota que voce tentou acessar nao existe.';

  return (
    <Layout title={`${notFoundTitle} - ${title}`} description={localizedSubtitle}>
      <Sidebar />
      <Page title={notFoundTitle}>
        <p>{notFoundDescription}</p>
      </Page>
    </Layout>
  );
};

export default NotFoundTemplate;

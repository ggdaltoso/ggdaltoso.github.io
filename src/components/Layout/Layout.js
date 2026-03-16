import React from 'react';
import Helmet from 'react-helmet';
import * as styles from './Layout.module.scss';
import 'react-medium-image-zoom/dist/styles.css';
import { useI18next } from 'gatsby-plugin-react-i18next';

const Layout = ({ children, title, description }) => {
  const { language } = useI18next();

  return (
    <div className={styles.layout}>
      <Helmet>
        <html lang={language} />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </div>
  );
};

export default Layout;

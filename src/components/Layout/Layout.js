import React from 'react';
import Helmet from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';

import GGHighlight from './Highlight';
import GGImage from './Image';
import * as styles from './Layout.module.scss';

import '@react95/core/themes/win95.css';
import '@react95/core/GlobalStyle';

const Layout = ({ children, title, description }) => (
  <div className={styles.layout}>
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    <MDXProvider
      components={{
        pre: GGHighlight,
        img: GGImage,
      }}
    >
      {children}
    </MDXProvider>
  </div>
);

export default Layout;

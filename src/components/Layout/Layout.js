import React from 'react';
import Helmet from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider, GlobalStyle } from '@react95/core';

import GGHighlight from './Highlight';
import GGImage from './Image';
import styles from './Layout.module.scss';

const Layout = ({ children, title, description }) => (
  <div className={styles.layout}>
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    <ThemeProvider>
      <GlobalStyle />
      <MDXProvider
        components={{
          pre: GGHighlight,
          img: GGImage,
        }}
      >
        {children}
      </MDXProvider>
    </ThemeProvider>
  </div>
);

export default Layout;

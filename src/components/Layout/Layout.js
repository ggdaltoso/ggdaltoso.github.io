// @flow
import React from "react";
import Helmet from "react-helmet";
import { MDXProvider } from "@mdx-js/react";
import type { Node as ReactNode } from "react";
import { ThemeProvider, GlobalStyle, Frame, Icon } from "@react95/core";

import GGHighlight from "./Highlight";
import GGImage from "./Image";
import styles from "./Layout.module.scss";

type Props = {
  children: ReactNode,
  title: string,
  description?: string,
};

const Layout = ({ children, title, description }: Props) => (
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

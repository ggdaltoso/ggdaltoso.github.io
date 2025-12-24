import React from 'react';
import Helmet from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';

import GGHighlight from './Highlight';
import GGImage from './Image';

const Layout = ({ children, title, description }) => (
  <div>
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    <MDXProvider
      components={{
        pre: GGHighlight,
        img: (props) => {
          console.log(`Rendering image with props:`, props);
          return <GGImage {...props} />;
        },
      }}
    >
      {children}
    </MDXProvider>
  </div>
);

export default Layout;

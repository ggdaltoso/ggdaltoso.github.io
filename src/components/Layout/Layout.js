import React from 'react';
import Helmet from 'react-helmet';

const Layout = ({ children, title, description }) => (
  <div>
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </div>
);

export default Layout;

import React from 'react';

const SEO = ({ locale, title, description }) => (
  <>
    {locale ? <html lang={locale} /> : null}
    {title ? <title>{title}</title> : null}
    {description ? <meta name="description" content={description} /> : null}
  </>
);

export default SEO;
import React from 'react';
import siteConfig from '@config';

const SEO = ({ locale, title, description, slug }) => {
  const siteUrl = siteConfig.url;
  const normalizedSlug = slug
    ? slug.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-')
    : undefined;
  const isHomeSlug =
    slug === '/' || slug === `/${locale}` || slug === `/${locale}/`;
  const homeImageSlug = isHomeSlug ? `home-${locale || 'pt'}` : normalizedSlug;
  const imageUrl = homeImageSlug ? `${siteUrl}/og-images/${homeImageSlug}.png` : undefined;
  const pagePath = slug ? (slug.startsWith('/') ? slug : `/${slug}`) : undefined;
  const pageUrl = pagePath ? `${siteUrl}${pagePath}` : undefined;

  return (
    <>
      {locale ? <html lang={locale} /> : null}
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}

      {/* Open Graph Meta Tags */}
      {title ? <meta property="og:title" content={title} /> : null}
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}
      {pageUrl ? <meta property="og:url" content={pageUrl} /> : null}
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
      {imageUrl ? <meta property="og:image:width" content="1200" /> : null}
      {imageUrl ? <meta property="og:image:height" content="630" /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale || 'pt_BR'} />

      {/* Twitter Card Meta Tags */}
      {title ? <meta name="twitter:title" content={title} /> : null}
      {description ? (
        <meta name="twitter:description" content={description} />
      ) : null}
      {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
};

export default SEO;
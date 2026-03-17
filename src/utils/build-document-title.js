import siteConfig from '../../config.js';

const buildDocumentTitle = (pageTitle) => {
  const siteTitle = siteConfig.title;

  if (!pageTitle) {
    return siteTitle;
  }

  return `${siteTitle} - ${pageTitle}`;
};

export default buildDocumentTitle;
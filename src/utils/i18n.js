const getI18nConfig = (siteMetadata = {}) => {
  const i18n = siteMetadata.i18n || {};
  const defaultLocale = i18n.defaultLocale || 'pt';
  const locales =
    Array.isArray(i18n.locales) && i18n.locales.length
      ? i18n.locales
      : [defaultLocale];

  return {
    defaultLocale,
    locales,
    paths: i18n.paths || {},
  };
};

const getLocalizedMenu = (menuByLocale = {}, locale, defaultLocale) =>
  menuByLocale[locale] || menuByLocale[defaultLocale] || [];

const getLocalizedValue = (value, locale, defaultLocale) => {
  if (value === null || typeof value === 'undefined') {
    return value;
  }

  if (typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (value[locale]) {
    return value[locale];
  }

  if (value[defaultLocale]) {
    return value[defaultLocale];
  }

  const fallbackKey = Object.keys(value)[0];
  return fallbackKey ? value[fallbackKey] : '';
};

const getLocalePaths = (siteMetadata, locale) => {
  const { paths, defaultLocale } = getI18nConfig(siteMetadata);
  return (
    paths[locale] ||
    paths[defaultLocale] || {
      tags: 'tags',
      category: 'category',
      categories: 'categories',
      page: 'page',
    }
  );
};

const normalizePath = (pathName = '/') => {
  if (!pathName.startsWith('/')) {
    return `/${pathName}`;
  }

  if (pathName !== '/' && pathName.endsWith('/')) {
    return pathName.replace(/\/+$/, '');
  }

  return pathName;
};

const withLocalePath = (pathName, locale, defaultLocale) => {
  const normalizedPath = normalizePath(pathName);
  const localePrefix = locale !== defaultLocale ? `/${locale}` : '';

  if (normalizedPath === '/') {
    return localePrefix ? `${localePrefix}/` : '/';
  }

  return `${localePrefix}${normalizedPath}`;
};

const buildLocalizedPageLookup = (pagesByKey = {}, defaultLocale = 'pt') => {
  return Object.values(pagesByKey).reduce((accumulator, localizedByLocale) => {
    Object.entries(localizedByLocale || {}).forEach(([locale, basePath]) => {
      const localizedPath = normalizePath(
        withLocalePath(basePath, locale, defaultLocale),
      );
      accumulator[localizedPath] = localizedByLocale;
    });

    return accumulator;
  }, {});
};

export {
  buildLocalizedPageLookup,
  getLocalizedMenu,
  getLocalizedValue,
  getLocalePaths,
  normalizePath,
  withLocalePath,
};

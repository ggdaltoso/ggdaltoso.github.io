import sharedI18n from '../../i18n-shared';

const { normalizePath, withLocalePath } = sharedI18n;

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
  normalizePath,
  withLocalePath,
};

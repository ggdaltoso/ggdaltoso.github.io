import { useLocation } from '@reach/router';
import { useI18next } from 'gatsby-plugin-react-i18next';
import useSiteMetadata from './use-site-metadata';
import { buildLocalizedPageLookup, normalizePath } from '../utils';

const useLanguageSwitcher = () => {
  const { i18n } = useSiteMetadata();
  const { pathname } = useLocation();
  const { languages, language, originalPath, defaultLanguage } = useI18next();

  const pagesByKey = i18n?.pages || {};
  const currentPath = normalizePath(pathname || '/');
  const pathLookup = buildLocalizedPageLookup(pagesByKey, defaultLanguage);
  const localizedByLocale = pathLookup[currentPath];

  const links = languages.map((lng) => ({
    language: lng,
    isActive: lng === language,
    to: localizedByLocale?.[lng] || originalPath,
  }));

  return {
    links,
  };
};

export default useLanguageSwitcher;

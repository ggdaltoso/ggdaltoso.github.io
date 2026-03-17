import { useI18next } from 'gatsby-plugin-react-i18next';
import useSiteMetadata from './use-site-metadata';
import { getLocalizedValue } from '../utils';

const useLocalizedSiteMetadata = () => {
  const siteMetadata = useSiteMetadata();
  const { language, defaultLanguage } = useI18next();

  return {
    ...siteMetadata,
    localizedSubtitle: getLocalizedValue(
      siteMetadata.subtitle,
      language,
      defaultLanguage,
    ),
  };
};

export default useLocalizedSiteMetadata;
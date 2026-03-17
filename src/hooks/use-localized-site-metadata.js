import useSiteMetadata from './use-site-metadata';
import useLocalizedValue from './use-localized-value';

const useLocalizedSiteMetadata = () => {
  const siteMetadata = useSiteMetadata();
  const localizedSubtitle = useLocalizedValue(siteMetadata.subtitle);

  return {
    ...siteMetadata,
    localizedSubtitle,
  };
};

export default useLocalizedSiteMetadata;
import { useI18next } from 'gatsby-plugin-react-i18next';
import { getLocalizedValue } from '../utils/i18n';

const useLocalizedValue = (value) => {
  const { language, defaultLanguage } = useI18next();

  return getLocalizedValue(value, language, defaultLanguage);
};

export default useLocalizedValue;
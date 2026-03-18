import { format, parseISO, isValid } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';

const localeByLanguage = {
  en: enUS,
  pt: ptBR,
};

const parseDate = (value) => {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = parseISO(value);
    if (isValid(parsed)) {
      return parsed;
    }
  }

  return new Date(value);
};

const formatLocalizedDate = (value, pattern, language = 'pt') => {
  const locale = localeByLanguage[language] || ptBR;
  return format(parseDate(value), pattern, { locale });
};

export { formatLocalizedDate };

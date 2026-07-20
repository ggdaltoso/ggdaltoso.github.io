import { enUS, ptBR } from 'date-fns/locale';
import dateShared from '../../date-shared';

const localeByLanguage = {
  en: enUS,
  pt: ptBR,
};

const { formatPostDate, formatFeedDate, toIsoDate } = dateShared;

const getDateFnsLocale = (language = 'pt') => localeByLanguage[language] || ptBR;

export { formatPostDate, formatFeedDate, toIsoDate, getDateFnsLocale };

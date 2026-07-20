const LOCALE_BY_LANGUAGE = {
  pt: 'pt-BR',
  en: 'en-US',
};

// Single source of truth for how post dates render across the site,
// the OG images, and llms.txt. Always UTC so the date shown never
// drifts with the viewer's (or the build machine's) timezone.
const formatPostDate = (value, language = 'pt') =>
  new Date(value).toLocaleDateString(
    LOCALE_BY_LANGUAGE[language] || LOCALE_BY_LANGUAGE.pt,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    },
  );

// Compact variant used by the feed listing ("17 julho 2026"), same
// UTC rule as formatPostDate so both always show the same day.
const formatFeedDate = (value, language = 'pt') => {
  const parts = new Intl.DateTimeFormat(
    LOCALE_BY_LANGUAGE[language] || LOCALE_BY_LANGUAGE.pt,
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    },
  ).formatToParts(new Date(value));
  const get = (type) => parts.find((part) => part.type === type).value;

  return `${get('day')} ${get('month')} ${get('year')}`;
};

const toIsoDate = (value) => new Date(value).toISOString().slice(0, 10);

module.exports = { formatPostDate, formatFeedDate, toIsoDate };

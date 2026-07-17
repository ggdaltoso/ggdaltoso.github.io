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

const toIsoDate = (value) => new Date(value).toISOString().slice(0, 10);

module.exports = { formatPostDate, toIsoDate };

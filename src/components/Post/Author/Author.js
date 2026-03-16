import React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { getContactHref, getLocalizedValue } from '../../../utils';
import * as styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';

const Author = () => {
  const { author } = useSiteMetadata();
  const { language, defaultLanguage } = useI18next();
  const authorBio = getLocalizedValue(author.bio, language, defaultLanguage);

  return (
    <div className={styles['author']}>
      <p>
        {authorBio}
        <a
          className={styles['author__bioBluesky']}
          href={getContactHref('bluesky', author.contacts.bluesky)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <strong>{author.name}</strong> on Bluesky
        </a>
      </p>
    </div>
  );
};

export default Author;

import React from 'react';
import { getContactHref } from '../../../utils';
import * as styles from './Author.module.scss';
import { useLocalizedSiteMetadata, useLocalizedValue } from '../../../hooks';

const Author = () => {
  const { author } = useLocalizedSiteMetadata();
  const authorBio = useLocalizedValue(author.bio);

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

import React from 'react';
import getContactHref from '@utils/get-contact-href';
import * as styles from './Author.module.scss';
import useLocalizedSiteMetadata from '@hooks/use-localized-site-metadata';
import useLocalizedValue from '@hooks/use-localized-value';

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

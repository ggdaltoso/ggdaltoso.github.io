import React from 'react';
import { getContactHref } from '../../../utils';
import * as styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles['author']}>
      <p>
        {author.bio}
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

import React from 'react';
import { withPrefix, Link } from 'gatsby';
import * as styles from './Author.module.scss';
import { Avatar } from '@react95/core';

const Author = ({ author, isIndex }) => (
  <div>
    <Link to="/" className={styles['author__info']}>
      <Avatar
        src={withPrefix(author.photo)}
        p="$1"
        size="75px"
        alt={author.name}
      />
      <div>
        {isIndex ? (
          <h1 className={styles['author__title']}>
            <Link className={styles['author__titleLink']} to="/">
              {author.name}
            </Link>
          </h1>
        ) : (
          <h2 className={styles['author__title']}>
            <Link className={styles['author__titleLink']} to="/">
              {author.name}
            </Link>
          </h2>
        )}
        <p className={styles['author__subtitle']}>{author.bio}</p>
      </div>
    </Link>
  </div>
);

export default Author;

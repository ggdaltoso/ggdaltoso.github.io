import React from 'react';
import { withPrefix, Link } from 'gatsby';
import * as styles from './Author.module.scss';

const Author = ({ author, isIndex }) => (
  <div>
    <Link to="/">
      <img
        src={withPrefix(author.photo)}
        className={styles['author__photo']}
        width="75"
        height="75"
        alt={author.name}
      />
    </Link>

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
);

export default Author;

import React from 'react';
import { withPrefix } from 'gatsby';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import * as styles from './Author.module.scss';
import { Avatar } from '@react95/core';
import { getLocalizedValue } from '../../../utils';

const Author = ({ author, isIndex }) => {
  const { language, defaultLanguage } = useI18next();
  const authorBio = getLocalizedValue(author.bio, language, defaultLanguage);

  return (
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
          <p className={styles['author__subtitle']}>{authorBio}</p>
        </div>
      </Link>
    </div>
  );
};

export default Author;

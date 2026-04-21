import React, { useState } from 'react';
import { withPrefix } from 'gatsby';
import { Link } from 'gatsby-plugin-react-i18next';
import * as styles from './Author.module.scss';
import { Avatar } from '@react95/core';
import { useLocalizedValue, useStories } from '@hooks';
import Stories from '@components/Stories';

const Author = ({ author, isIndex }) => {
  const authorBio = useLocalizedValue(author.bio);
  const { hasStories } = useStories();
  const [storiesOpen, setStoriesOpen] = useState(false);

  const handleAvatarClick = (e) => {
    if (!hasStories) return;
    e.preventDefault();
    setStoriesOpen(true);
  };

  return (
    <div>
      <Link to="/" className={styles['author__info']}>
        <button
          className={
            styles[hasStories ? 'author__avatarRing' : 'author__avatar']
          }
          onClick={handleAvatarClick}
          aria-label={hasStories ? 'Ver stories' : undefined}
        >
          <Avatar
            src={withPrefix(author.photo)}
            p="$1"
            size="75px"
            alt={author.name}
            border={'2px solid white'}
          />
        </button>
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
      <Stories isOpen={storiesOpen} onClose={() => setStoriesOpen(false)} />
    </div>
  );
};

export default Author;

import React from 'react';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';

import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import * as styles from './Post.module.scss';

const Post = ({ post, html }) => {
  const { t } = useTranslation();
  const { tagSlugs, slug } = post.fields || {};
  const { tags, title, date } = post.frontmatter;

  return (
    <div className={styles['post']}>
      <Link className={styles['post__homeButton']} to="/">
        {t('All posts')}
      </Link>

      <div>
        <Content title={title} body={html} />
      </div>

      <div className={styles['post__footer']}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;

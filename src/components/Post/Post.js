import React from 'react';
import { Link } from 'gatsby';

import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import * as styles from './Post.module.scss';

const Post = ({ post, html }) => {
  const { tagSlugs, slug } = post.fields || {};
  const { tags, title, date, issueNumber } = post.frontmatter;

  return (
    <div>
      <Link className={styles['post__homeButton']} to="/">
        Todos os artigos
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
        <Comments issueNumber={issueNumber} />
      </div>
    </div>
  );
};

export default Post;

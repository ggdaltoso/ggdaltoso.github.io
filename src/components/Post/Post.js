import React from 'react';
import { Link } from 'gatsby';

import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import * as styles from './Post.module.scss';

const Post = ({ post, mdx }) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;

  return (
    <div>
      <Link className={styles['post__homeButton']} to="/">
        Todos os artigos
      </Link>

      <div>
        <Content
          body={mdx ? mdx.body : html}
          mdx={Boolean(mdx)}
          title={title}
        />
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

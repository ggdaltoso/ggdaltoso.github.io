import React from 'react';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';

import Author from './Author/Author';
import Comments from './Comments/Comments';
import Content from './Content/Content';
import Meta from './Meta/Meta';
import Share from './Share/Share';
import * as styles from './Post.module.scss';

const Post = ({ post, mdxContent }) => {
  const { t } = useTranslation();
  const { locale } = post.fields || {};
  const { title, date } = post.frontmatter;
  const { readingTime } = post;

  return (
    <div className={styles['post']}>
      <Link className={styles['post__homeButton']} to="/">
        {t('All posts')}
      </Link>

      <div>
        <Content title={title} readingTime={readingTime} shareable>
          {mdxContent}
        </Content>
      </div>

      <div className={styles['post__footer']}>
        <div className={styles['post__footerMeta']}>
          <Meta date={date} />
          <Share title={title} />
        </div>
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postTitle={title} postLocale={locale} />
      </div>
    </div>
  );
};

export default Post;

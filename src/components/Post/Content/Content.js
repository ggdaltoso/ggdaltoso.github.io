import React from 'react';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import styles from './Content.module.scss';

const Content = ({ body, title, mdx }) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    {mdx ? (
      <div className={styles['content__body']}>
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    ) : (
      <div
        className={styles['content__body']}
        dangerouslySetInnerHTML={{ __html: body }}
      />
    )}
  </div>
);

export default Content;

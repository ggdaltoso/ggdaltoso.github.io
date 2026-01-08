import React from 'react';
import HtmlContent from './HtmlContent';

import * as styles from './Content.module.scss';

const Content = ({ body, title }) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    <div className={styles['content__body']}>
      <HtmlContent html={body} />
    </div>
  </div>
);

export default Content;

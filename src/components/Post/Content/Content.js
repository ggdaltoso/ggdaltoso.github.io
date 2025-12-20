import React from 'react';

import * as styles from './Content.module.scss';

const Content = ({ children, title }) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    <div className={styles['content__body']}>{children}</div>
  </div>
);

export default Content;

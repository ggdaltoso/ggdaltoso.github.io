import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import getReadingTimeMinutes from '@utils/get-reading-time-minutes';
import Share from '../Share/Share';

import * as styles from './Content.module.scss';

const Content = ({ title, readingTime, shareable = false, children }) => {
  const { t } = useTranslation();
  const readingTimeMinutes = getReadingTimeMinutes(readingTime);

  return (
    <div className={styles['content']}>
      <h1 className={styles['content__title']}>{title}</h1>
      <div className={styles['content__meta']}>
        {readingTimeMinutes ? (
          <p className={styles['content__readingTime']}>
            {t('min read', { count: readingTimeMinutes })}
          </p>
        ) : null}
        {readingTimeMinutes && shareable ? (
          <span className={styles['content__separator']} aria-hidden="true">
            ·
          </span>
        ) : null}
        {shareable ? <Share title={title} compact /> : null}
      </div>
      <div className={styles['content__body']}>{children}</div>
    </div>
  );
};

export default Content;

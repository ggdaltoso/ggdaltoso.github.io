import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { getReadingTimeMinutes } from '../../../utils';
import HtmlContent from './HtmlContent';

import * as styles from './Content.module.scss';

const Content = ({ body, title, readingTime }) => {
  const { t } = useTranslation();
  const readingTimeMinutes = getReadingTimeMinutes(readingTime);

  return (
    <div className={styles['content']}>
      <h1 className={styles['content__title']}>{title}</h1>
      {readingTimeMinutes ? (
        <p className={styles['content__readingTime']}>
          {t('min read', { count: readingTimeMinutes })}
        </p>
      ) : null}
      <div className={styles['content__body']}>
        <HtmlContent html={body} />
      </div>
    </div>
  );
};

export default Content;

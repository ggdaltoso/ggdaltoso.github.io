import React from 'react';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { formatPostDate } from '@utils/date';
import * as styles from './Meta.module.scss';

const Meta = ({ date }) => {
  const { language } = useI18next();
  const { t } = useTranslation();

  return (
    <div>
      <p className={styles['meta__date']}>
        {t('Published')} {formatPostDate(date, language)}
      </p>
    </div>
  );
};

export default Meta;

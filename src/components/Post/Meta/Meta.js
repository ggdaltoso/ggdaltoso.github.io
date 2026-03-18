import React from 'react';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { formatLocalizedDate } from '../../../utils';
import * as styles from './Meta.module.scss';

const Meta = ({ date }) => {
  const { language } = useI18next();
  const { t } = useTranslation();

  return (
    <div>
      <p className={styles['meta__date']}>
        {t('Published')} {formatLocalizedDate(date, 'd MMM yyyy', language)}
      </p>
    </div>
  );
};

export default Meta;

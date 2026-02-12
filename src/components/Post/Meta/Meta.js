import React from 'react';
import moment from 'moment';
import * as styles from './Meta.module.scss';

const Meta = ({ date }) => (
  <div>
    <p className={styles['meta__date']}>
      Published {moment(date).format('D MMM YYYY')}
    </p>
  </div>
);

export default Meta;

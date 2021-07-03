import React from 'react';
import * as styles from './Copyright.module.scss';

const Copyright = ({ copyright }) => (
  <div className={styles['copyright']}>{copyright}</div>
);

export default Copyright;

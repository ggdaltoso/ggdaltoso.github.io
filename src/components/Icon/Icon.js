import React from 'react';
import * as styles from './Icon.module.scss';

const Icon = ({ icon }) => (
  <svg className={styles['icon']} viewBox={icon.viewBox}>
    <path d={icon.path} />
  </svg>
);

export default Icon;

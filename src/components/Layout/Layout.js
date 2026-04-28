import React from 'react';
import * as styles from './Layout.module.scss';
import 'react-medium-image-zoom/dist/styles.css';
import '@react95/fonts';

const Layout = ({ children }) => <div className={styles.layout}>{children}</div>;

export default Layout;

import React from 'react';
import { Link } from 'gatsby';
import * as styles from './Menu.module.scss';

const Menu = ({ menu }) => (
  <nav className={styles['menu']}>
    <ul className={styles['menu__list']}>
      {menu.map((item) => (
        <li className={styles['menu__listItem']} key={item.path}>
          <Link
            to={item.path}
            className={styles['menu__listItemLink']}
            activeClassName={styles['menu__listItemLinkActive']}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Menu;

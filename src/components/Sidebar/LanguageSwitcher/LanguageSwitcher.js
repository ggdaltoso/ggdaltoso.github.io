import React from 'react';
import { Link } from 'gatsby-plugin-react-i18next';
import { useLanguageSwitcher } from '../../../hooks';
import * as styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
  const { links } = useLanguageSwitcher();

  return (
    <nav aria-label="Language selector">
      <ul className={styles['languageSwitcher__list']}>
        {links.map(({ language, isActive, to }) => {
          return (
            <li className={styles['languageSwitcher__listItem']} key={language}>
              <Link
                to={to}
                language={language}
                className={`${styles['languageSwitcher__listItemLink']} ${
                  isActive ? styles['languageSwitcher__listItemLinkActive'] : ''
                }`}
              >
                {language.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LanguageSwitcher;

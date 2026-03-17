import React from 'react';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import * as styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
  const { languages, language, originalPath } = useI18next();

  return (
    <nav aria-label="Language selector">
      <ul className={styles['languageSwitcher__list']}>
        {languages.map((lng) => {
          const isActive = lng === language;

          return (
            <li className={styles['languageSwitcher__listItem']} key={lng}>
              <Link
                to={originalPath}
                language={lng}
                className={`${styles['languageSwitcher__listItemLink']} ${
                  isActive ? styles['languageSwitcher__listItemLinkActive'] : ''
                }`}
              >
                {lng.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LanguageSwitcher;

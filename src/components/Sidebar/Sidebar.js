import React from 'react';
import Author from './Author';
import Contacts from './Contacts';
import LanguageSwitcher from './LanguageSwitcher';
import Menu from './Menu';
import * as styles from './Sidebar.module.scss';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { useSiteMetadata } from '../../hooks';
import { getLocalizedMenu } from '../../utils';

const Sidebar = ({ isIndex }) => {
  const { author, menu } = useSiteMetadata();
  const { language, defaultLanguage } = useI18next();
  const localizedMenu = getLocalizedMenu(menu, language, defaultLanguage);
  const rssPrefix = language !== defaultLanguage ? `/${language}` : '';
  const contacts = {
    ...author.contacts,
    rss: `${rssPrefix}/rss.xml`,
  };

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <div className={styles['sidebar__languageSwitcher']}>
          <LanguageSwitcher />
        </div>
        <Author author={author} isIndex={isIndex} />
        <div className={styles['sidebar__content']}>
          <Menu menu={localizedMenu} />
          <Contacts contacts={contacts} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

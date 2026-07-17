import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { formatPostDate, toIsoDate } from '../../utils/date';
import getReadingTimeMinutes from '../../utils/get-reading-time-minutes';
import * as styles from './Feed.module.scss';

const Feed = ({ edges }) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  return (
    <div>
      {edges.map((edge) => (
        <div className={styles['feed__item']} key={edge.node.fields.slug}>
          <div className={styles['feed__itemMeta']}>
            <time
              className={styles['feed__itemMetaTime']}
              dateTime={toIsoDate(edge.node.frontmatter.date)}
            >
              {formatPostDate(edge.node.frontmatter.date, language)}
            </time>
            {getReadingTimeMinutes(edge.node.readingTime) ? (
              <span className={styles['feed__itemMetaReadingTime']}>
                {' '}
                -{' '}
                {t('min read', {
                  count: getReadingTimeMinutes(edge.node.readingTime),
                })}
              </span>
            ) : null}
          </div>
          <h2 className={styles['feed__itemTitle']}>
            <Link
              className={styles['feed__itemTitleLink']}
              to={edge.node.fields.slug}
            >
              {edge.node.frontmatter.title}
            </Link>
          </h2>
          <p className={styles['feed__itemDescription']}>
            {edge.node.frontmatter.description}
          </p>
          <Link
            className={styles['feed__itemReadmore']}
            to={edge.node.fields.slug}
          >
            {t('Read')}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Feed;

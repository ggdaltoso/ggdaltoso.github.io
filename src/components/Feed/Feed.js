import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import * as styles from './Feed.module.scss';

const Feed = ({ edges }) => {
  const { t } = useTranslation();

  return (
    <div>
      {edges.map((edge) => (
        <div className={styles['feed__item']} key={edge.node.fields.slug}>
          <div>
            <time
              className={styles['feed__itemMetaTime']}
              dateTime={moment(edge.node.frontmatter.date).format(
                'MMMM D, YYYY',
              )}
            >
              {moment(edge.node.frontmatter.date).format('MMMM YYYY')}
            </time>
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

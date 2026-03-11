import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Giscus } from '../../../../plugins/gatsby-plugin-giscus';

const Comments = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            giscus {
              repo
              repoId
              category
              categoryId
              mapping
              reactionsEnabled
              emitMetadata
              inputPosition
              theme
              lang
            }
          }
        }
      }
    `
  );

  const { giscus } = site.siteMetadata;

  // Se as configurações não estiverem completas, não renderiza
  if (!giscus.repo || !giscus.repoId || !giscus.categoryId) {
    return null;
  }

  return <Giscus {...giscus} />;
};

export default Comments;


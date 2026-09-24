import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Giscus } from '@plugins/gatsby-plugin-giscus';
import siteConfig from '@config';
import buildDocumentTitle from '@utils/build-document-title';

const Comments = ({ postTitle, postLocale }) => {
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

  const defaultLocale = siteConfig.i18n?.defaultLocale || 'pt';
  const locale = postLocale || defaultLocale;
  const documentTitle = buildDocumentTitle(postTitle);

  // Este termo é o título da discussão no GitHub, porque o mapping é
  // 'specific'. Antes era 'title', e como o título do documento é o mesmo nas
  // duas línguas, PT e EN caíam na mesma discussão.
  //
  // O idioma padrão continua usando o título do documento sem sufixo, de
  // propósito: é exatamente o que o 'title' gerava, então as discussões que já
  // existem seguem sendo encontradas, sem renomear nada. Os outros idiomas
  // ganham sufixo e abrem discussão própria.
  const term =
    locale === defaultLocale ? documentTitle : `${documentTitle} (${locale})`;

  return <Giscus {...giscus} term={term} lang={locale} />;
};

export default Comments;

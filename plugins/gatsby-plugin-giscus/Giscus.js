import React from 'react';
import GiscusComponent from '@giscus/react';

/**
 * Giscus comment component
 * 
 * @param {Object} props - Component properties
 * @param {string} props.repo - GitHub repository in the format "owner/repo"
 * @param {string} props.repoId - GitHub repository ID
 * @param {string} props.category - Discussion category name
 * @param {string} props.categoryId - Discussion category ID
 * @param {string} [props.mapping='pathname'] - How Giscus will match comments to pages
 * @param {boolean} [props.strict='0'] - Use strict title matching
 * @param {boolean} [props.reactionsEnabled='1'] - Enable reactions
 * @param {boolean} [props.emitMetadata='0'] - Emit discussion metadata
 * @param {string} [props.inputPosition='bottom'] - Comment input position
 * @param {string} [props.theme='light'] - Giscus theme
 * @param {string} [props.lang='pt'] - Language
 * @param {boolean} [props.loading='lazy'] - Loading mode
 */
const Giscus = ({
  repo,
  repoId,
  category,
  categoryId,
  mapping = 'pathname',
  strict = '0',
  reactionsEnabled = '1',
  emitMetadata = '0',
  inputPosition = 'bottom',
  theme = 'light',
  lang = 'pt',
  loading = 'lazy',
}) => {
  // Only render on client-side
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <GiscusComponent
      repo={repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping={mapping}
      strict={strict}
      reactionsEnabled={reactionsEnabled}
      emitMetadata={emitMetadata}
      inputPosition={inputPosition}
      theme={theme}
      lang={lang}
      loading={loading}
    />
  );
};

export default Giscus;

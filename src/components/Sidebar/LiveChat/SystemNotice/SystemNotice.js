import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Frame } from '@react95/core';

const JoinNotice = ({ message }) => {
  const { t } = useTranslation();

  return (
    <Frame
      as="p"
      m="$0"
      p="$2"
      textAlign="center"
      fontStyle="italic"
      color="$materialTextDisabled"
      fontSize="var(--typographic-tiny-font-size)"
      lineHeight="var(--typographic-tiny-font-size)"
    >
      {t('{{name}} joined the chat', { name: message.displayName })}
    </Frame>
  );
};

export default JoinNotice;

import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Frame } from '@react95/core';

const NOTICE_KEYS = {
  join: '{{name}} joined the chat',
  leave: '{{name}} left the chat',
};

const SystemNotice = ({ message }) => {
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
      {t(NOTICE_KEYS[message.type], { name: message.displayName })}
    </Frame>
  );
};

export default SystemNotice;

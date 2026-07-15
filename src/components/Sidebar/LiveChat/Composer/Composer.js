import React, { useState } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Frame, TextArea, Button } from '@react95/core';

const MAX_LENGTH = 500;

const Composer = ({ onSend }) => {
  const { t } = useTranslation();
  const [text, setText] = useState('');

  const trimmed = text.trim();
  const canSend = trimmed.length > 0 && text.length <= MAX_LENGTH;

  const handleSend = () => {
    if (!canSend) return;
    onSend(trimmed);
    setText('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Frame mt="var(--typographic-leading)">
      <TextArea
        boxShadow="in"
        bg="white"
        width="100%"
        p="$8"
        value={text}
        placeholder={t('Type a message')}
        onChange={({ target }) => setText(target.value)}
        onKeyDown={handleKeyDown}
        style={{ resize: 'none' }}
        rows={2}
      />
      <Frame
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="$4"
      >
        <Frame
          as="span"
          color="$materialTextDisabled"
          fontSize="var(--typographic-tiny-font-size)"
        >
          {t('Supports **bold**, *italic*, code and [links](url)')}
        </Frame>
        <Frame display="flex" gap="$4" alignItems="center">
          <Frame
            as="span"
            color="$materialTextDisabled"
            fontSize="var(--typographic-tiny-font-size)"
          >
            {text.length}/{MAX_LENGTH}
          </Frame>
          <Button onClick={handleSend} disabled={!canSend}>
            {t('Send')}
          </Button>
        </Frame>
      </Frame>
    </Frame>
  );
};

export default Composer;

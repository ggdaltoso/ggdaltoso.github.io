import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Frame, TextArea, Button } from '@react95/core';
import { useMarkdownComposer } from '@hooks';

const MAX_LENGTH = 500;

const Composer = ({ onSend }) => {
  const { t } = useTranslation();
  const {
    text,
    setText,
    textareaRef,
    trimmed,
    isValid,
    reset,
    wrapSelection,
    insertLink,
  } = useMarkdownComposer(MAX_LENGTH);

  const handleSend = () => {
    if (!isValid) return;
    onSend(trimmed);
    reset();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Frame p="$2" boxShadow="$in">
      <Frame display="flex" gap="$2" mb="$2">
        <Button
          w="28px"
          paddingInline="$0"
          fontWeight="bold"
          onClick={() => wrapSelection('**')}
          title={t('Bold')}
        >
          B
        </Button>
        <Button
          w="28px"
          paddingInline="$0"
          fontStyle="italic"
          onClick={() => wrapSelection('*')}
          title={t('Italic')}
        >
          I
        </Button>
        <Button
          w="28px"
          paddingInline="$0"
          fontFamily="var(--typographic-monospace-font-family)"
          onClick={() => wrapSelection('`')}
          title={t('Code')}
        >
          {'</>'}
        </Button>
        <Button
          w="30px"
          paddingInline="$0"
          onClick={() => insertLink(t('link text'))}
          title={t('Link')}
        >
          {t('Link')}
        </Button>
      </Frame>
      <TextArea
        ref={textareaRef}
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
        justifyContent="end"
        alignItems="center"
        mt="$4"
        mb="$4"
        gap="$4"
      >
        <Frame as="span" fontSize="var(--typographic-small-font-size)">
          {text.length}/{MAX_LENGTH}
        </Frame>
        <Button onClick={handleSend} disabled={!isValid}>
          {t('Send')}
        </Button>
      </Frame>
    </Frame>
  );
};

export default Composer;

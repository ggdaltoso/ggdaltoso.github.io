import React, { useRef, useState } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Frame, TextArea, Button } from '@react95/core';

const MAX_LENGTH = 500;

const Composer = ({ onSend }) => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

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

  const focusSelection = (start, end) => {
    requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.focus();
      textarea.setSelectionRange(start, end);
    });
  };

  const wrapSelection = (before, after = before) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;
    const selected = value.slice(selectionStart, selectionEnd);
    const nextValue =
      value.slice(0, selectionStart) +
      before +
      selected +
      after +
      value.slice(selectionEnd);

    setText(nextValue);
    focusSelection(
      selectionStart + before.length,
      selectionStart + before.length + selected.length,
    );
  };

  const insertLink = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;
    const label = value.slice(selectionStart, selectionEnd) || t('link text');
    const before = `[${label}](`;
    const nextValue =
      value.slice(0, selectionStart) + before + ')' + value.slice(selectionEnd);

    setText(nextValue);
    focusSelection(
      selectionStart + before.length,
      selectionStart + before.length,
    );
  };

  return (
    <Frame mt="var(--typographic-leading)">
      <Frame display="flex" gap="$2" mb="$2">
        <Button
          type="button"
          w="28px"
          fontWeight="bold"
          onClick={() => wrapSelection('**')}
          title={t('Bold')}
        >
          B
        </Button>
        <Button
          type="button"
          w="28px"
          fontStyle="italic"
          onClick={() => wrapSelection('*')}
          title={t('Italic')}
        >
          I
        </Button>
        <Button
          type="button"
          w="28px"
          fontFamily="var(--typographic-monospace-font-family)"
          onClick={() => wrapSelection('`')}
          title={t('Code')}
        >
          {'</>'}
        </Button>
        <Button type="button" onClick={insertLink} title={t('Link')}>
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

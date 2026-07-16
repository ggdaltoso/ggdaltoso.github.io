import { useRef, useState } from 'react';

const useMarkdownComposer = (maxLength) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const trimmed = text.trim();
  const isValid = trimmed.length > 0 && text.length <= maxLength;

  const reset = () => setText('');

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

  const insertLink = (placeholderLabel) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;
    const label = value.slice(selectionStart, selectionEnd) || placeholderLabel;
    const before = `[${label}](`;
    const nextValue =
      value.slice(0, selectionStart) + before + ')' + value.slice(selectionEnd);

    setText(nextValue);
    focusSelection(
      selectionStart + before.length,
      selectionStart + before.length,
    );
  };

  return {
    text,
    setText,
    textareaRef,
    trimmed,
    isValid,
    reset,
    wrapSelection,
    insertLink,
  };
};

export default useMarkdownComposer;

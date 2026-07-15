import React from 'react';

const TOKEN_RE =
  /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

const parseChatMarkdown = (text = '') => {
  const nodes = [];
  let lastIndex = 0;
  let key = 0;
  let match = TOKEN_RE.exec(text);

  while (match !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [full, bold, italic, code, linkLabel, linkHref] = match;
    if (bold !== undefined) {
      nodes.push(<strong key={key++}>{bold}</strong>);
    } else if (italic !== undefined) {
      nodes.push(<em key={key++}>{italic}</em>);
    } else if (code !== undefined) {
      nodes.push(<code key={key++}>{code}</code>);
    } else if (linkLabel !== undefined) {
      nodes.push(
        <a
          key={key++}
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {linkLabel}
        </a>,
      );
    } else {
      nodes.push(full);
    }

    lastIndex = TOKEN_RE.lastIndex;
    match = TOKEN_RE.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

export default parseChatMarkdown;

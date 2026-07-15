import React from 'react';

const TOKEN_RE = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[([^\]]+)\]\(([^\s)]+)\)/g;

const HTTP_PROTOCOL_RE = /^https?:\/\//i;
const OTHER_PROTOCOL_RE = /^[a-z][a-z0-9+.-]*:/i;

// Accepts http(s) URLs as-is, assumes https:// for bare domains/paths
// (e.g. "example.com"), and rejects anything with another explicit
// scheme (javascript:, data:, ...) by returning null.
const resolveHref = (href) => {
  if (HTTP_PROTOCOL_RE.test(href)) return href;
  if (OTHER_PROTOCOL_RE.test(href)) return null;
  return `https://${href}`;
};

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
      const href = resolveHref(linkHref);
      if (href) {
        nodes.push(
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {linkLabel}
          </a>,
        );
      } else {
        nodes.push(full);
      }
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

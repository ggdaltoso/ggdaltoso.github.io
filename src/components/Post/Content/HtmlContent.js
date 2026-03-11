import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import GGHighlight from '../../Layout/Highlight';
import GGImage from '../../Layout/Image';

// Converts the HTML string generated from Markdown into React elements,
// replacing specific tags with the blog's custom components.
const HtmlContent = ({ html }) => {
  const options = {
    replace: (node) => {
      // Markdown images often arrive wrapped in <p>. When that paragraph only
      // contains an image, unwrap it so GGImage is not rendered inside <p>.
      if (node.name === 'p' && node.children) {
        const contentNodes = node.children.filter(
          ({ type, data }) => type !== 'text' || data.trim(),
        );

        if (contentNodes.length === 1 && contentNodes[0].name === 'img') {
          return <>{domToReact(node.children, options)}</>;
        }
      }

      // Replace plain <img> tags with the styled image component used by posts.
      if (node.name === 'img') {
        return <GGImage {...node.attribs} />;
      }

      // Replace fenced code blocks with the syntax highlighted component,
      // preserving the language declared in the generated class name.
      if (node.name === 'pre' && node.children && node.children[0]) {
        const codeNode = node.children[0];
        if (
          codeNode.name === 'code' &&
          codeNode.children &&
          codeNode.children[0]
        ) {
          const code = codeNode.children[0].data || '';
          const className = codeNode.attribs?.class || '';
          const language = className.replace('language-', '') || 'javascript';
          return <GGHighlight code={code} language={language} />;
        }
      }
    },
  };

  // Parse the HTML string and apply the replacements defined above.
  return <>{parse(html, options)}</>;
};

export default HtmlContent;

import React from 'react';
import parse from 'html-react-parser';
import GGHighlight from '../../Layout/Highlight';
import GGImage from '../../Layout/Image';

const HtmlContent = ({ html }) => {
  const options = {
    replace: (node) => {
      if (node.name === 'img') {
        return <GGImage {...node.attribs} />;
      }

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

  return <>{parse(html, options)}</>;
};

export default HtmlContent;

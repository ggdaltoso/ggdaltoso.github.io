import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Frame } from '@react95/core';

const GGHighlight = (props) => {
  return (
    <Frame p={4} pr={5}>
      <Highlight
        code={props.children.props.children}
        language="javascript"
        theme={themes.github}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Frame
            p={4}
            boxShadow="in"
            style={{
              overflowX: 'auto',
              ...style,
            }}
            className="gatsby-highlight"
          >
            <Pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </Pre>
          </Frame>
        )}
      </Highlight>
    </Frame>
  );
};

export default GGHighlight;

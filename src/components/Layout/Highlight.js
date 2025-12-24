import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Frame } from '@react95/core';

const GGHighlight = (props) => {
  return (
    <Frame boxShadow="$out" p="$4" bgColor="$material">
      <Highlight
        code={props.children.props.children}
        language="javascript"
        theme={themes.github}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Frame
            p="$4"
            boxShadow="$in"
            style={{
              overflowX: 'auto',
              ...style,
            }}
            className="gatsby-highlight"
          >
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          </Frame>
        )}
      </Highlight>
    </Frame>
  );
};

export default GGHighlight;

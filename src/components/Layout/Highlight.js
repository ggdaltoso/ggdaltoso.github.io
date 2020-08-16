import React from "react";
import styled from "styled-components";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";
import { Frame } from "@react95/core";

const Wrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

const Pre = styled.pre`
  text-align: left;
  margin: 0;
  padding: 0.5em;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

const GGHighlight = (props) => {
  return (
    <Frame p={4} pr={5}>
      <Highlight
        {...defaultProps}
        code={props.children.props.children}
        language="javascript"
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Frame
            p={4}
            boxShadow="in"
            style={{
              overflowX: "auto",
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

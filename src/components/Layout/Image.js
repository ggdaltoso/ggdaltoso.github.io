import React from "react";
import { Frame } from "@react95/core";
import Icons from "@react95/icons";
import styled from "styled-components";

const Title = styled.span`
  color: white;
  margin: 0 0 0 2px;
  font-size: 0.675rem;
  line-height: 0.875rem;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const GGImage = (props) => {
  console.log("props", props);

  const { src, alt, title, width } = props;

  return (
    <Frame p={1} width={`${width}px`} mh="auto">
      <Frame
        bg="primary"
        height={18}
        w="100%"
        boxShadow="none"
        pl={2}
        pt={1}
        display="flex"
      >
        <i
          style={{
            backgroundImage: `url('${Icons.wangimg_128}')`,
            width: 15,
            height: 15,
            backgroundSize: "cover",
            display: "block",
            margin: 0,
          }}
        />
        <Title>{title}</Title>
      </Frame>
      <Frame p={3} pr={4} as="figure" boxShadow="none">
        <Frame bg="white" boxShadow="in" pt={2} pl={2}>
          <img src={src} alt={alt} title={title} />
        </Frame>

        <Frame boxShadow="in" as="figcaption" pl={2} pt={2}>
          {alt}
        </Frame>
      </Frame>
    </Frame>
  );
};

export default GGImage;

import React from 'react';
import { Frame, TitleBar } from '@react95/core';
import { Wangimg128 } from '@react95/icons';

const GGImage = (props) => {
  const { src, alt, title, width } = props;

  return (
    <Frame p={1} width={`${width}px`} mh="auto">
      <TitleBar title={title} icon={<Wangimg128 variant="16x16_4" />} />

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

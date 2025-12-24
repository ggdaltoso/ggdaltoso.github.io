import React from 'react';
import { Frame, TitleBar } from '@react95/core';
import { Wangimg128 } from '@react95/icons';

const GGImage = (props) => {
  console.log('GGImage props:', props);
  const { src, alt, title } = props;

  const [description, width] = title.split('|').map((s) => s.trim());

  return (
    <Frame p="$1" boxShadow="$out" width={`${width}px`} mh="auto">
      <TitleBar
        title={alt}
        icon={<Wangimg128 variant="16x16_4" />}
        style={{
          fontSize: 'var(--typographic-small-font-size)',
        }}
      />

      <Frame p="$3" pr="$4" as="figure" bgColor="$material">
        <Frame bg="white" boxShadow="$in" pt="$2" pl="$2">
          <img src={src} alt={alt} title={title} />
        </Frame>

        <Frame boxShadow="$in" as="figcaption" pl="$2" pt="$2">
          {description}
        </Frame>
      </Frame>
    </Frame>
  );
};

export default GGImage;

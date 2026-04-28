import React, { useState } from 'react';
import { Frame, Fieldset, Dropdown, Input, Checkbox, TextArea } from '@react95/core';

const SIZES = [8, 10, 12, 14, 18, 24];

const families = [
  ...SIZES.map((pt) => `R95 Sans Serif ${pt}pt`),
  ...SIZES.map((pt) => `R95 Sans Serif HiRes ${pt}pt`),
  ...SIZES.map((pt) => `R95 Serif ${pt}pt`),
  ...SIZES.map((pt) => `R95 Serif HiRes ${pt}pt`),
];

const FontDemo = () => {
  const [fontSize, setFontSize] = useState(40);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [fontFamily, setFontFamily] = useState(families[3]);

  return (
    <Frame
      display="flex"
      h="320px"
      overflow="hidden"
      boxShadow="$out"
      backgroundColor="$material"
      p="$4"
    >
      <Frame width="250px" minWidth="250px" overflow="auto" p="$4">
        {families.map((family) => (
          <Frame
            key={family}
            fontFamily={`'${family}'`}
            boxShadow={fontFamily === family ? '$in' : '$out'}
            bg="white"
            p="$8"
            fontSize="20px"
            mt="$4"
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              '--typographic-font-family': `'${family}'`,
            }}
            onClick={() => setFontFamily(family)}
          >
            {family}
          </Frame>
        ))}
      </Frame>

      <Frame
        display="flex"
        flexDirection="column"
        flexGrow="1"
        overflow="hidden"
        p="$4"
      >
        <Fieldset legend="Config">
          <Frame display="flex" flexDirection="column" gap="$4">
            <Frame display="flex" gap="$4" flexWrap="wrap">
              <Dropdown
                key={fontFamily}
                onChange={({ target }) => setFontFamily(target.value)}
                defaultValue={fontFamily}
                options={families}
              />
              <Input
                type="number"
                onChange={({ target }) => {
                  const v = parseInt(target.value);
                  if (!isNaN(v) && v > 0) setFontSize(v);
                }}
                defaultValue={fontSize}
              />
            </Frame>
            <Frame
              display="flex"
              gap="$4"
              alignItems="center"
              flexWrap="wrap"
              fontSize="12px"
            >
              <Checkbox checked={italic} onChange={() => setItalic(!italic)}>
                Italic
              </Checkbox>
              <Checkbox checked={bold} onChange={() => setBold(!bold)}>
                Bold
              </Checkbox>
            </Frame>
          </Frame>
        </Fieldset>

        <TextArea
          boxShadow="in"
          bg="white"
          width="100%"
          p="$12"
          fontFamily={`'${fontFamily}'`}
          fontSize={`${fontSize}px`}
          fontStyle={italic ? 'italic' : 'normal'}
          fontWeight={bold ? 'bold' : 'normal'}
          mt="$6"
          mx="$1"
          mr="$4"
          defaultValue="Hello, from R95 Fonts"
          style={{
            flex: 1,
            resize: 'none',
            '--typographic-font-family': `'${fontFamily}'`,
          }}
        />
      </Frame>
    </Frame>
  );
};

export default FontDemo;

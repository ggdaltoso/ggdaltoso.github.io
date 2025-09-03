import { Frame, TitleBar } from '@react95/core';
import { Wangimg128 } from '@react95/icons';

interface GGImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
}

const imageStyle: React.CSSProperties = {
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
};

const GGImage: React.FC<GGImageProps> = ({
  src,
  alt,
  title,
  width,
  height,
  ...props
}) => {
  const imageTitle = title || alt;

  return (
    <div
      className="gg-image-container"
      style={{
        width: width ? `${width}px` : 'auto',
        maxWidth: '100%',
      }}
    >
      <Frame p="$1" mh="auto" boxShadow="$out" bgColor="$material">
        <TitleBar title={title} icon={<Wangimg128 variant="16x16_4" />} />

        <Frame p="$3" pr="$4" as="figure" boxShadow="none">
          <Frame bg="white" boxShadow="$in" pt="$2" pl="$2">
            <img
              src={src}
              alt={alt}
              title={imageTitle}
              loading="lazy"
              style={imageStyle}
              {...props}
            />
          </Frame>

          <Frame
            boxShadow="$in"
            as="figcaption"
            pl="$4"
            pt="$2"
            mt="$4"
            fontStyle="italic"
          >
            {alt}
          </Frame>
        </Frame>
      </Frame>
    </div>
  );
};

export default GGImage;

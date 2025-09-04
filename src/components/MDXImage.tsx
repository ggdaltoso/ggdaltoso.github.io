import { Frame, TitleBar } from '@react95/core';
import { Wangimg128 } from '@react95/icons';

interface MDXImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
}

const MDXImage: React.FC<MDXImageProps> = ({
  src,
  alt,
  title,
  width,
  ...props
}) => {
  // Processa título customizado com parâmetros (ex: "Título | width=400")
  let processedTitle = title || alt;
  let processedWidth = width;

  if (title && title.includes(' | ')) {
    const [actualTitle, params] = title.split(' | ');
    processedTitle = actualTitle;

    const widthMatch = params.match(/width=(\d+)/);
    if (widthMatch) {
      processedWidth = parseInt(widthMatch[1], 10);
    }
  }

  return (
    <div
      className="image-container"
      style={{
        width: processedWidth ? `${processedWidth}px` : 'auto',
        maxWidth: '100%',
      }}
    >
      <Frame p="$1" mh="auto" boxShadow="$out" bgColor="$material">
        <TitleBar
          title={processedTitle}
          icon={<Wangimg128 variant="16x16_4" />}
        />

        <Frame p="$3" pr="$4" as="figure" boxShadow="none">
          <Frame bg="white" boxShadow="$in" pt="$2" pl="$2">
            <img
              src={src}
              alt={alt}
              title={processedTitle}
              loading="lazy"
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

export default MDXImage;

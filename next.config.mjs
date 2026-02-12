import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrismPlus from 'rehype-prism-plus';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrismPlus],
  },
});

export default withMDX(nextConfig);

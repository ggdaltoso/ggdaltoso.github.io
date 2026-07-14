import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Frame, TitleBar } from '@react95/core';
import { Textchat2 } from '@react95/icons';
import * as styles from './LiveChat.module.scss';

const LiveChat = () => {
  const { t } = useTranslation();
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          liveChat {
            enabled
            channel
            theme
            customCssPath
          }
        }
      }
    }
  `);
  const { enabled, channel, theme, customCssPath } =
    site.siteMetadata.liveChat || {};

  if (!enabled || !channel) return null;

  const params = new URLSearchParams();
  if (theme) params.set('theme', theme);
  if (customCssPath) params.set('custom_css_path', customCssPath);
  const query = params.toString();
  const src = `https://embed.tlk.io/${channel}${query ? `?${query}` : ''}`;

  return (
    <Frame
      as="iframe"
      h="360px"
      w="100%"
      title={t('Chat')}
      src={src}
      frameBorder="0"
      boxShadow="$out"
    />
  );
};

export default LiveChat;

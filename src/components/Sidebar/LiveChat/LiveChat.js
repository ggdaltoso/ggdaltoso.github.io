import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Frame, TitleBar } from '@react95/core';
import { Textchat2 } from '@react95/icons';
import { useChatAuth, useChatMessages } from '@hooks';
import MessageList from './MessageList';
import JoinForm from './JoinForm';
import Composer from './Composer';

const LiveChat = () => {
  const { t } = useTranslation();
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          liveChat {
            enabled
          }
        }
      }
    }
  `);
  const { enabled } = site.siteMetadata.liveChat || {};

  const {
    user,
    authReady,
    hasJoined,
    setNickname,
    signInWithGoogle,
    signInWithGithub,
    authError,
  } = useChatAuth();
  const { messages, loading, sendMessage } = useChatMessages();

  if (typeof window === 'undefined' || !enabled) return null;

  const handleSend = (text) => {
    if (!user) return;
    sendMessage({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text,
    });
  };

  return (
    <Frame
      w="100%"
      p="$1"
      bgColor="$material"
      mt="var(--typographic-leading)"
      boxShadow="$out"
    >
      <TitleBar title={t('Chat')} icon={<Textchat2 variant="16x16_4" />} />
      <Frame
        p="$2"
        pb="$4"
        bg="$material"
        h="300px"
        display="flex"
        flexDirection="column"
      >
        <MessageList messages={messages} loading={loading} />
        {hasJoined ? (
          <Composer onSend={handleSend} />
        ) : (
          <JoinForm
            ready={authReady}
            onSubmitNickname={setNickname}
            onSignInWithGoogle={signInWithGoogle}
            onSignInWithGithub={signInWithGithub}
            error={authError}
          />
        )}
      </Frame>
    </Frame>
  );
};

export default LiveChat;

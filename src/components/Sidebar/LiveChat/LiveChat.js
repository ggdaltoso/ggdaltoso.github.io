import React, { useCallback } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Frame, List, TaskBar, TitleBar } from '@react95/core';
import { Textchat2, ReaderNoshared } from '@react95/icons';
import { useChatAuth, useChatMessages } from '@hooks';
import MessageList from './MessageList';
import JoinForm from './JoinForm';
import Composer from './Composer';
import * as styles from './LiveChat.module.scss';

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

  const { messages, loading, sendMessage, sendJoinMessage } = useChatMessages();
  const handleJoin = useCallback(
    (joinedUser) => {
      sendJoinMessage({
        uid: joinedUser.uid,
        displayName: joinedUser.displayName,
        photoURL: joinedUser.photoURL,
      });
    },
    [sendJoinMessage],
  );

  const {
    user,
    authReady,
    hasJoined,
    setNickname,
    signInWithGoogle,
    signInWithGithub,
    signOutUser,
    authError,
  } = useChatAuth({ onJoin: handleJoin });

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
    <Frame w="100%" p="$1" bgColor="$material" boxShadow="$out">
      <TitleBar
        fontSize="var(--typographic-root-font-size)"
        title={t('Chat')}
        icon={<Textchat2 variant="16x16_4" />}
      />
      <Frame
        p="$2"
        bg="$material"
        display="flex"
        flexDirection="column"
        gap="$4"
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
      {hasJoined && (
        <TaskBar
          className={styles.taskBar}
          list={
            <List>
              <List.Item
                icon={<ReaderNoshared variant="16x16_4" />}
                onClick={signOutUser}
              >
                {t('Sign out')}
              </List.Item>
            </List>
          }
        />
      )}
    </Frame>
  );
};

export default LiveChat;

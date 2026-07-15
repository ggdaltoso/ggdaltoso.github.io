import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Frame } from '@react95/core';
import MessageGroup from '../MessageGroup';

const GROUP_WINDOW_MS = 5 * 60 * 1000;

const toDate = (timestamp) => (timestamp?.toDate ? timestamp.toDate() : null);

const isSameGroup = (current, previous) => {
  if (!previous || current.uid !== previous.uid) return false;

  const currentDate = toDate(current.createdAt);
  const previousDate = toDate(previous.createdAt);
  if (!currentDate || !previousDate) return false;

  return currentDate - previousDate <= GROUP_WINDOW_MS;
};

const groupMessages = (messages) =>
  messages.reduce((groups, message) => {
    const lastGroup = groups[groups.length - 1];
    const lastMessage = lastGroup?.messages[lastGroup.messages.length - 1];

    if (lastGroup && isSameGroup(message, lastMessage)) {
      lastGroup.messages.push(message);
    } else {
      groups.push({
        key: message.id,
        uid: message.uid,
        displayName: message.displayName,
        photoURL: message.photoURL,
        messages: [message],
      });
    }

    return groups;
  }, []);

const MessageList = ({ messages, loading }) => {
  const { t } = useTranslation();
  const scrollRef = useRef(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages.length]);

  const isEmpty = !loading && messages.length === 0;
  const groups = groupMessages(messages);

  return (
    <Frame
      ref={scrollRef}
      boxShadow="$in"
      bg="white"
      overflow="auto"
      h="220px"
      display="flex"
      flexDirection="column"
      pl="$1"
    >
      {isEmpty ? (
        <Frame
          as="p"
          m="$0"
          color="$materialTextDisabled"
          fontSize="var(--typographic-small-font-size)"
        >
          {t('No messages yet — be the first to say something!')}
        </Frame>
      ) : (
        groups.map((group) => <MessageGroup key={group.key} group={group} />)
      )}
    </Frame>
  );
};

export default MessageList;

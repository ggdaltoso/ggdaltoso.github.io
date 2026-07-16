import React, { useState } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { Frame } from '@react95/core';
import { User } from '@react95/icons';
import { formatDistanceToNow } from 'date-fns';
import { getDateFnsLocale, parseChatMarkdown } from '@utils';

const MessageGroup = ({ group }) => {
  const { language } = useI18next();
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [firstMessage] = group.messages;
  const timestamp = firstMessage.createdAt?.toDate
    ? firstMessage.createdAt.toDate()
    : null;

  const showAvatar = group.photoURL && !avatarFailed;

  return (
    <Frame display="flex" gap="$4" p="$4" pb="$6" alignItems="flex-start">
      <Frame w="30px" h="30px" flexShrink="0">
        {showAvatar ? (
          <Frame
            as="img"
            src={group.photoURL}
            alt={group.displayName}
            display="block"
            objectFit="cover"
            boxShadow="$in"
            p="$1"
            onError={() => setAvatarFailed(true)}
          />
        ) : (
          <Frame
            boxShadow="$in"
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgColor="$material"
          >
            <User />
          </Frame>
        )}
      </Frame>
      <Frame minW="0" flexGrow="1">
        <Frame
          display="flex"
          flexDirection="column"
          gap="$2"
          alignItems="baseline"
          mb="$8"
          p="$2"
        >
          <Frame
            as="span"
            fontSize="var(--typographic-root-font-size)"
            lineHeight="var(--typographic-root-font-size)"
            fontWeight="bold"
          >
            {group.displayName}
          </Frame>
          {timestamp && (
            <Frame
              as="span"
              color="$borderDarkest"
              fontSize="var(--typographic-tiny-font-size)"
              lineHeight="var(--typographic-tiny-font-size)"
            >
              {formatDistanceToNow(timestamp, {
                addSuffix: true,
                locale: getDateFnsLocale(language),
              })}
            </Frame>
          )}
        </Frame>
        {group.messages.map((message) => (
          <Frame
            key={message.id}
            as="p"
            m="0"
            lineHeight="var(--typographic-base-font-size)"
            fontSize="var(--typographic-root-font-size)"
            wordBreak="break-word"
          >
            {parseChatMarkdown(message.text)}
          </Frame>
        ))}
      </Frame>
    </Frame>
  );
};

export default MessageGroup;

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
    <Frame display="flex" gap="$2" py="calc(var(--typographic-leading) / 4)">
      <Frame w="32px" h="32px" flexShrink="0">
        {showAvatar ? (
          <Frame
            as="img"
            src={group.photoURL}
            alt={group.displayName}
            width={32}
            height={32}
            display="block"
            width="100%"
            height="100%"
            objectFit="cover"
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
        <Frame display="flex" gap="$2" alignItems="baseline">
          <Frame
            as="span"
            fontSize="var(--typographic-small-font-size)"
            fontWeight="bold"
          >
            {group.displayName}
          </Frame>
          {timestamp && (
            <Frame
              as="span"
              color="$materialTextDisabled"
              fontSize="var(--typographic-tiny-font-size)"
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
            fontSize="var(--typographic-small-font-size)"
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

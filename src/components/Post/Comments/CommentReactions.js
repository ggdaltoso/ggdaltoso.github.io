import React from 'react';
import { Button, Frame } from '@react95/core';
import * as styles from './Comments.module.scss';

const getReactionEmoji = (reactionType) => {
  const emojiMap = {
    '+1': '👍',
    '-1': '👎',
    laugh: '😄',
    hooray: '🎉',
    confused: '😕',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀',
  };
  return emojiMap[reactionType] || '👍';
};

const CommentReactions = ({ reactions }) => {
  if (!reactions || reactions.total_count === 0) {
    return null;
  }

  const filteredReactions = Object.entries(reactions).filter(
    ([type, count]) => type !== 'url' && type !== 'total_count' && count > 0,
  );

  if (filteredReactions.length === 0) {
    return null;
  }

  return (
    <Frame display="flex" gap="$4" flexWrap="wrap">
      {filteredReactions.map(([type, count]) => (
        <Button
          key={type}
          boxShadow="$out"
          display="inline-flex"
          alignItems="center"
          gap="$4"
          className={styles['reactions__button']}
        >
          <span>{getReactionEmoji(type)}</span>
          <span>{count}</span>
        </Button>
      ))}
    </Frame>
  );
};

export default CommentReactions;

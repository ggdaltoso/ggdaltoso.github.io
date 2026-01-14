import React, { useState } from 'react';
import { Button, Frame, Cursor, List } from '@react95/core';

import * as styles from './Comments.module.scss';

const AVAILABLE_REACTIONS = [
  { type: '+1', emoji: '👍', label: 'Thumbs Up' },
  { type: '-1', emoji: '👎', label: 'Thumbs Down' },
  { type: 'laugh', emoji: '😄', label: 'Laugh' },
  { type: 'hooray', emoji: '🎉', label: 'Hooray' },
  { type: 'confused', emoji: '😕', label: 'Confused' },
  { type: 'heart', emoji: '❤️', label: 'Heart' },
  { type: 'rocket', emoji: '🚀', label: 'Rocket' },
  { type: 'eyes', emoji: '👀', label: 'Eyes' },
];

const ReactionPicker = ({ onSelectReaction, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (reactionType) => {
    onSelectReaction(reactionType);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        boxShadow="$out"
        title="Adicionar reação"
        mr="$2"
        className={[styles['reactions__button'], Cursor.Pointer].join(' ')}
      >
        😊 +
      </Button>
    );
  }

  return (
    <Frame position="relative" display="inline-block">
      <List position="absolute" bottom="100%" left="0" zIndex={1000}>
        {AVAILABLE_REACTIONS.map((reaction) => (
          <List.Item
            key={reaction.type}
            onClick={() => handleSelect(reaction.type)}
            title={reaction.label}
            style={{
              paddingInline: '7px',
            }}
          >
            {reaction.emoji}
          </List.Item>
        ))}
        <List.Divider w="93%" />
        <List.Item
          onClick={() => setIsOpen(false)}
          style={{
            paddingInline: '7px',
          }}
        >
          ❌
        </List.Item>
      </List>
      <Button
        onClick={() => setIsOpen(false)}
        mr="$2"
        className={[styles['reactions__button'], Cursor.Pointer].join(' ')}
      >
        😊 +
      </Button>
    </Frame>
  );
};

export default ReactionPicker;

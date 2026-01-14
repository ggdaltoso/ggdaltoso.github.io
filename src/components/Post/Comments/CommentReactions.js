import React, { useState } from 'react';
import { Button, Cursor, Frame } from '@react95/core';
import { useGitHubAuth } from '../../../hooks/use-github-auth';
import { useToggleReactionMutation } from '../../../hooks/use-comments-query';
import ReactionPicker from './ReactionPicker';
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

const CommentReactions = ({ reactions, commentId, issueNumber }) => {
  const { user } = useGitHubAuth();
  const [loadingReaction, setLoadingReaction] = useState(null);
  const toggleReactionMutation = useToggleReactionMutation(issueNumber);

  const handleReactionClick = async (reactionType) => {
    if (!user) return;

    setLoadingReaction(reactionType);
    try {
      await toggleReactionMutation.mutateAsync({
        commentId,
        reactionType,
        action: 'add',
      });
    } catch (err) {
      console.error('Error toggling reaction:', err);
    } finally {
      setLoadingReaction(null);
    }
  };

  const filteredReactions =
    reactions && reactions.total_count > 0
      ? Object.entries(reactions).filter(
          ([type, count]) =>
            type !== 'url' && type !== 'total_count' && count > 0,
        )
      : [];

  return (
    <Frame display="flex" gap="$4" flexWrap="wrap" alignItems="center">
      {user && (
        <ReactionPicker
          onSelectReaction={handleReactionClick}
          disabled={!!loadingReaction}
        />
      )}

      {filteredReactions.map(([type, count]) => (
        <Button
          key={type}
          boxShadow="$out"
          display="inline-flex"
          alignItems="center"
          gap="$4"
          className={[
            styles['reactions__button'],
            user ? Cursor.Pointer : Cursor.NotAllowed,
          ].join(' ')}
          onClick={() => handleReactionClick(type)}
          disabled={!user || loadingReaction === type}
        >
          <span>{getReactionEmoji(type)}</span>
          <span>{loadingReaction === type ? '...' : count}</span>
        </Button>
      ))}
    </Frame>
  );
};

export default CommentReactions;

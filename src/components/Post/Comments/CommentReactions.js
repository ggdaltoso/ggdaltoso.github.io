import React, { useState } from 'react';
import { Button, Cursor, Frame } from '@react95/core';
import { useGitHubAuth } from '../../../hooks/use-github-auth';
import { useToggleReactionMutation, useCommentReactionsQuery } from '../../../hooks/use-comments-query';
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
  const { data: detailedReactions } = useCommentReactionsQuery(commentId, true);

  const handleReactionClick = async (reactionType) => {
    if (!user) return;

    // Check if user already reacted with this type
    const userHasReacted = detailedReactions?.some(
      (r) => r.content === reactionType && r.user.login === user.login
    );

    setLoadingReaction(reactionType);
    try {
      await toggleReactionMutation.mutateAsync({
        commentId,
        reactionType,
        action: userHasReacted ? 'remove' : 'add',
      });
    } catch (err) {
      console.error('Error toggling reaction:', err);
    } finally {
      setLoadingReaction(null);
    }
  };

  // Build reaction summary from detailed reactions
  const reactionSummary = detailedReactions?.reduce((acc, reaction) => {
    const type = reaction.content;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {}) || {};

  const filteredReactions = Object.entries(reactionSummary).filter(
    ([type, count]) => count > 0
  );

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

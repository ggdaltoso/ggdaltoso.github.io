'use client';

import { ReactionType } from '@/types/comment';
import { useToggleReaction } from '@/hooks/useToggleReaction';

interface CommentReactionsProps {
  commentId: number;
  issueNumber: number;
  reactions?: {
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
}

const REACTION_EMOJIS: Record<ReactionType, string> = {
  '+1': '👍',
  '-1': '👎',
  laugh: '😄',
  hooray: '🎉',
  confused: '😕',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

export default function CommentReactions({
  commentId,
  issueNumber,
  reactions,
}: CommentReactionsProps) {
  const toggleReaction = useToggleReaction({ issueNumber, commentId });

  if (!reactions || reactions.total_count === 0) {
    return null;
  }

  const handleReactionClick = (reaction: ReactionType) => {
    toggleReaction.mutate(reaction);
  };

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {(Object.entries(REACTION_EMOJIS) as [ReactionType, string][]).map(
        ([reactionType, emoji]) => {
          const count = reactions[reactionType];
          if (count === 0) return null;

          return (
            <button
              key={reactionType}
              onClick={() => handleReactionClick(reactionType)}
              className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              title={`Reagir com ${emoji}`}
            >
              <span>{emoji}</span>
              <span className="text-gray-700">{count}</span>
            </button>
          );
        },
      )}
    </div>
  );
}

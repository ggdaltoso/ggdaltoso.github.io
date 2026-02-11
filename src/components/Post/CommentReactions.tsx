'use client';

import { ReactionType } from '@/types/comment';
import { useToggleReaction } from '@/hooks/useToggleReaction';
import ReactionPicker from './ReactionPicker';
import { useSession } from 'next-auth/react';

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
  userReactions?: Partial<Record<ReactionType, number>>;
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
  userReactions = {},
}: CommentReactionsProps) {
  const { data: session } = useSession();
  const toggleReaction = useToggleReaction({ issueNumber, commentId });

  const handleReactionClick = (reaction: ReactionType) => {
    toggleReaction.mutate(reaction);
  };

  const hasReactions = reactions && reactions.total_count > 0;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {hasReactions &&
        (Object.entries(REACTION_EMOJIS) as [ReactionType, string][]).map(
          ([reactionType, emoji]) => {
            const count = reactions[reactionType];
            if (count === 0) return null;

            const hasUserReacted = !!userReactions[reactionType];

            return (
              <button
                key={reactionType}
                onClick={() => handleReactionClick(reactionType)}
                disabled={!session}
                className={`inline-flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-colors ${
                  hasUserReacted
                    ? 'bg-blue-100 hover:bg-blue-200 border border-blue-300'
                    : 'bg-gray-100 hover:bg-gray-200'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={
                  session
                    ? hasUserReacted
                      ? `Remover ${emoji}`
                      : `Reagir com ${emoji}`
                    : 'Faça login para reagir'
                }
              >
                <span>{emoji}</span>
                <span
                  className={
                    hasUserReacted
                      ? 'text-blue-700 font-medium'
                      : 'text-gray-700'
                  }
                >
                  {count}
                </span>
              </button>
            );
          },
        )}

      {session && (
        <ReactionPicker
          onSelectReaction={handleReactionClick}
          disabled={toggleReaction.isPending}
        />
      )}
    </div>
  );
}

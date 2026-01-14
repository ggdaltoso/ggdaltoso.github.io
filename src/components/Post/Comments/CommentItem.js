import React from 'react';
import { Avatar, Frame } from '@react95/core';
import CommentReactions from './CommentReactions';
import * as styles from './Comments.module.scss';

const CommentItem = ({ comment, issueNumber }) => {
  return (
    <Frame
      bgColor="$material"
      p="$4"
      boxShadow="$out"
      mb="$8"
      display="flex"
      flexDirection="column"
      gap="$4"
    >
      <Frame display="flex" alignItems="center" gap="$4">
        <Avatar
          src={comment.user.avatar_url}
          alt={comment.user.login}
          size="56px"
          flexShrink={0}
          p="$1"
        />
        <Frame width="100%" display="flex" flexDirection="column" gap="$2">
          <Frame p="$2" pl="$4" boxShadow="$in">
            <a
              href={comment.user.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{comment.user.login}
            </a>
          </Frame>

          <Frame p="$2" pl="$4" boxShadow="$in" as="time">
            {new Date(comment.created_at).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Frame>
        </Frame>
      </Frame>
      <Frame
        boxShadow="$in"
        p="$4"
        bgColor="white"
        dangerouslySetInnerHTML={{ __html: comment.body_html }}
        className={styles['comments__body']}
      />
      <CommentReactions
        reactions={comment.reactions}
        commentId={comment.id}
        issueNumber={issueNumber}
      />
    </Frame>
  );
};

export default CommentItem;

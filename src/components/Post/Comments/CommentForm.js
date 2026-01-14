import React from 'react';
import { useGitHubAuth } from '../../../hooks/use-github-auth';
import { Avatar, Frame, TextArea, Button, TitleBar } from '@react95/core';

import * as styles from './Comments.module.scss';
import { Bulb, FilePen } from '@react95/icons';

const CommentForm = ({
  newComment,
  setNewComment,
  posting,
  issueUrl,
  issueNumber,
  onSubmit,
}) => {
  const { user, handleLogout } = useGitHubAuth();

  if (!user) return null;

  return (
    <Frame p="$2" boxShadow="$out" mb="$8" bgColor="$material">
      <TitleBar
        title="Adicionar Comentário"
        icon={<FilePen variant="16x16_4" />}
      />
      <Frame as="form" p="$2" onSubmit={onSubmit}>
        <TextArea
          w="100%"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Use Markdown para formatar seu comentário..."
          rows={5}
          disabled={posting}
        />
        <Frame
          fontSize="0.75rem"
          mt="$8"
          mb="$12"
          ml="$8"
          display="flex"
          gap="$8"
          alignItems="center"
        >
          <Bulb variant="32x32_4" />
          <Frame>
            <Frame display="flex" alignItems="center" mb="$4">
              Você está comentando em como{' '}
              <Avatar
                circle
                className={styles.avatar}
                src={user.avatar_url}
                alt={user.login}
                size="20px"
                ml="$4"
              />
              <Frame as="strong" mt="-4px" ml="$2">
                @{user.login}
              </Frame>
            </Frame>
            <Frame>
              Seu comentário será postado em
              <Frame
                ml="$4"
                as="a"
                href={issueUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                #{issueNumber}
              </Frame>
            </Frame>
          </Frame>
        </Frame>

        <Frame display="flex" gap="$4" alignItems="center">
          <Button onClick={handleLogout}>Deslogar</Button>

          <Button type="submit" disabled={!newComment.trim() || posting}>
            {posting ? 'Postando...' : 'Commentar'}
          </Button>
        </Frame>
      </Frame>
    </Frame>
  );
};

export default CommentForm;

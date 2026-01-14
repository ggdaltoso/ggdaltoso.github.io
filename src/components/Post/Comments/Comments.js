import React from 'react';
import { Fieldset, Frame } from '@react95/core';
import { useGitHubComments } from '../../../hooks/use-github-comments';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import LoginPrompt from './LoginPrompt';

const Comments = ({ issueNumber }) => {
  const {
    comments,
    loading,
    error,
    user,
    newComment,
    setNewComment,
    posting,
    visible,
    containerRef,
    handleLogin,
    handleLogout,
    handleSubmitComment,
    issueUrl,
    hasClientId,
  } = useGitHubComments(issueNumber);

  if (!issueNumber) {
    return null;
  }

  return (
    <Fieldset legend="Comentários" mt="$0" mb="$8">
      <Frame ref={containerRef} mb="$8">
        <Frame>
          {!visible && <p>Carregando...</p>}

          {visible && loading && <p>Carregando comentários...</p>}

          {visible && error && <p>Erro ao carregar comentários: {error}</p>}

          {visible && !loading && !error && (
            <>
              {comments.length === 0 ? (
                <p>
                  Nenhum comentário ainda.{' '}
                  {!user && 'Faça login para comentar!'}
                </p>
              ) : (
                <div>
                  {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))}
                </div>
              )}

              {user ? (
                <CommentForm
                  user={user}
                  newComment={newComment}
                  setNewComment={setNewComment}
                  posting={posting}
                  issueUrl={issueUrl}
                  issueNumber={issueNumber}
                  onSubmit={handleSubmitComment}
                  onLogout={handleLogout}
                />
              ) : (
                <LoginPrompt onLogin={handleLogin} hasClientId={hasClientId} />
              )}
            </>
          )}
        </Frame>
      </Frame>
    </Fieldset>
  );
};

export default Comments;

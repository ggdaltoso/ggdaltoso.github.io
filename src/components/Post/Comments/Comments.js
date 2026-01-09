import React from 'react';
import * as styles from './Comments.module.scss';
import { useGitHubComments } from '../../../hooks/use-github-comments';
import { Avatar, Button, Frame } from '@react95/core';

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
    <>
      <Frame as="h3" mt="$0">
        Comments
      </Frame>
      <Frame ref={containerRef} mb="$8">
        <Frame>
          {!visible && (
            <p className={styles['comments__loading']}>Loading...</p>
          )}

          {visible && loading && (
            <p className={styles['comments__loading']}>Loading comments...</p>
          )}

          {visible && error && (
            <p className={styles['comments__error']}>
              Error loading comments: {error}
            </p>
          )}

          {visible && !loading && !error && (
            <>
              {comments.length === 0 ? (
                <p className={styles['comments__empty']}>
                  No comments yet. {!user && 'Sign in to comment!'}
                </p>
              ) : (
                <div className={styles['comments__list']}>
                  {comments.map((comment) => (
                    <Frame
                      bgColor="$material"
                      p="$4"
                      key={comment.id}
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
                        <Frame
                          width="100%"
                          display="flex"
                          flexDirection="column"
                          gap="$2"
                        >
                          <Frame
                            p="$2"
                            pl="$4"
                            boxShadow="$in"
                            as="a"
                            href={comment.user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            @{comment.user.login}
                          </Frame>

                          <Frame p="$2" pl="$4" boxShadow="$in" as="time">
                            {new Date(comment.created_at).toLocaleDateString(
                              'pt-BR',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              },
                            )}
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
                      {comment.reactions &&
                        comment.reactions.total_count > 0 && (
                          <Frame display="flex" gap="$4" flexWrap="wrap">
                            {Object.entries(comment.reactions)
                              .filter(
                                ([type, count]) =>
                                  type !== 'url' &&
                                  type !== 'total_count' &&
                                  count > 0,
                              )
                              .map(([type, count]) => (
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
                        )}
                    </Frame>
                  ))}
                </div>
              )}

              {user ? (
                <div className={styles['comments__form-container']}>
                  <div className={styles['comments__user-info']}>
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className={styles['comments__avatar']}
                    />
                    <span>
                      Commenting as <strong>{user.login}</strong>
                    </span>
                    <button
                      onClick={handleLogout}
                      className={styles['comments__logout-btn']}
                    >
                      Sign out
                    </button>
                  </div>
                  <form
                    onSubmit={handleSubmitComment}
                    className={styles['comments__form']}
                  >
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your comment... (Markdown supported)"
                      className={styles['comments__textarea']}
                      rows={5}
                      disabled={posting}
                    />
                    <div className={styles['comments__form-actions']}>
                      <small className={styles['comments__hint']}>
                        Comments are posted on{' '}
                        <a
                          href={issueUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          issue #{issueNumber}
                        </a>
                      </small>
                      <button
                        type="submit"
                        disabled={!newComment.trim() || posting}
                        className={styles['comments__submit-btn']}
                      >
                        {posting ? 'Posting...' : 'Comment'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className={styles['comments__login']}>
                  <p>To comment, sign in with your GitHub account:</p>
                  <button
                    onClick={handleLogin}
                    className={styles['comments__login-btn']}
                    disabled={!hasClientId}
                  >
                    <svg
                      height="16"
                      width="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    Sign in with GitHub
                  </button>
                  {!hasClientId && (
                    <small className={styles['comments__error']}>
                      Configure GATSBY_GITHUB_CLIENT_ID to enable sign in
                    </small>
                  )}
                </div>
              )}
            </>
          )}
        </Frame>
      </Frame>
    </>
  );
};

export default Comments;

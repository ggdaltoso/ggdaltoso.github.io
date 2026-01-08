import React, { useEffect, useState, useRef } from 'react';
import * as styles from './Comments.module.scss';

const GITHUB_OWNER = 'ggdaltoso';
const GITHUB_REPO = 'ggdaltoso.github.io';
const GITHUB_CLIENT_ID = process.env.GATSBY_GITHUB_CLIENT_ID || '';

// GitHub OAuth using utterances proxy (or use your own)
// For production, you'll need to create a GitHub OAuth App and configure a proxy
const OAUTH_PROXY = 'https://utteranc.es';

const Comments = ({ issueNumber }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);

  // Lazy loading - load comments only when visible
  useEffect(() => {
    if (!issueNumber || typeof window === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !visible) {
            setVisible(true);
          }
        });
      },
      {
        rootMargin: '100px', // Load 100px before becoming visible
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [issueNumber, visible]);

  // Fetch comments when visible
  useEffect(() => {
    if (!visible || !issueNumber) {
      return;
    }

    const fetchComments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('github_token');
        const headers = {
          Accept: 'application/vnd.github.v3.html+json',
        };

        if (token) {
          headers['Authorization'] = `token ${token}`;
        }

        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issueNumber}/comments`,
          { headers },
        );

        if (!response.ok) {
          throw new Error('Failed to load comments');
        }

        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [visible, issueNumber]);

  // Check if user is authenticated
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('github_token');
    if (token) {
      fetchUser(token);
    }

    // Capture OAuth code from URL (after GitHub redirect)
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      exchangeCodeForToken(code);
      // Remove code from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('github_token');
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  const exchangeCodeForToken = async (code) => {
    try {
      // Using utterances proxy - for production, you'll need your own
      const response = await fetch(`${OAUTH_PROXY}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('github_token', token);
        fetchUser(token);
      }
    } catch (err) {
      console.error('Error exchanging code for token:', err);
    }
  };

  const handleLogin = () => {
    const redirectUri = window.location.origin + window.location.pathname;
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&scope=public_repo`;
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem('github_token');
    setUser(null);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim() || !user) return;

    setPosting(true);
    try {
      const token = localStorage.getItem('github_token');
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issueNumber}/comments`,
        {
          method: 'POST',
          headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3.html+json',
          },
          body: JSON.stringify({ body: newComment }),
        },
      );

      if (!response.ok) {
        throw new Error('Error posting comment');
      }

      const comment = await response.json();
      setComments([...comments, comment]);
      setNewComment('');
    } catch (err) {
      alert('Error posting comment: ' + err.message);
    } finally {
      setPosting(false);
    }
  };

  if (!issueNumber) {
    return null;
  }

  const issueUrl = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issueNumber}`;

  return (
    <div ref={containerRef} className={styles['comments']}>
      <h3 className={styles['comments__title']}>Comments</h3>

      {!visible && <p className={styles['comments__loading']}>Loading...</p>}

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
                <div key={comment.id} className={styles['comments__item']}>
                  <div className={styles['comments__header']}>
                    <a
                      href={comment.user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles['comments__author']}
                    >
                      <img
                        src={comment.user.avatar_url}
                        alt={comment.user.login}
                        className={styles['comments__avatar']}
                      />
                      <strong>{comment.user.login}</strong>
                    </a>
                    <time className={styles['comments__date']}>
                      {new Date(comment.created_at).toLocaleDateString(
                        'pt-BR',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </time>
                  </div>
                  <div
                    className={styles['comments__body']}
                    dangerouslySetInnerHTML={{ __html: comment.body_html }}
                  />
                </div>
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
                disabled={!GITHUB_CLIENT_ID}
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
              {!GITHUB_CLIENT_ID && (
                <small className={styles['comments__error']}>
                  Configure GATSBY_GITHUB_CLIENT_ID to enable sign in
                </small>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;

import { useEffect, useState, useRef } from 'react';

const GITHUB_OWNER = 'ggdaltoso';
const GITHUB_REPO = 'ggdaltoso.github.io';
const GITHUB_CLIENT_ID = process.env.GATSBY_GITHUB_CLIENT_ID || '';
const OAUTH_PROXY = 'https://utteranc.es';

export const useGitHubComments = (issueNumber) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);

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
        rootMargin: '100px',
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

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      exchangeCodeForToken(code);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return {
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
    issueUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issueNumber}`,
    hasClientId: !!GITHUB_CLIENT_ID,
  };
};

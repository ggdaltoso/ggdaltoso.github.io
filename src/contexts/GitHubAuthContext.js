import React, { createContext, useState, useEffect } from 'react';

const GITHUB_OWNER = 'ggdaltoso';
const GITHUB_REPO = 'ggdaltoso.github.io';
const GITHUB_CLIENT_ID = process.env.GATSBY_GITHUB_CLIENT_ID || '';
const OAUTH_PROXY = 'https://utteranc.es';

export const GitHubAuthContext = createContext(null);

export const GitHubAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      setUser(null);
    } finally {
      setLoading(false);
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
        await fetchUser(token);
      }
    } catch (err) {
      console.error('Error exchanging code for token:', err);
      setLoading(false);
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

  const getToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('github_token');
  };

  // Check if user is authenticated on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('github_token');
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      exchangeCodeForToken(code);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const value = {
    user,
    loading,
    handleLogin,
    handleLogout,
    getToken,
    hasClientId: !!GITHUB_CLIENT_ID,
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
  };

  return (
    <GitHubAuthContext.Provider value={value}>
      {children}
    </GitHubAuthContext.Provider>
  );
};

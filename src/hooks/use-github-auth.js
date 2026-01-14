import { useContext } from 'react';
import { GitHubAuthContext } from '../contexts/GitHubAuthContext';

export const useGitHubAuth = () => {
  const context = useContext(GitHubAuthContext);

  if (!context) {
    throw new Error('useGitHubAuth must be used within a GitHubAuthProvider');
  }

  return context;
};

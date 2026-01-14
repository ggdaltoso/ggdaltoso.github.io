import { useState, useRef, useEffect } from 'react';
import { useGitHubAuth } from './use-github-auth';
import { useCommentsQuery, usePostCommentMutation } from './use-comments-query';

export const useGitHubComments = (issueNumber) => {
  const [newComment, setNewComment] = useState('');
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);

  const { user, handleLogin, handleLogout, hasClientId, owner, repo } =
    useGitHubAuth();

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

  // Fetch comments using React Query
  const {
    data: comments = [],
    isLoading: loading,
    error: queryError,
  } = useCommentsQuery(issueNumber, visible);

  // Post comment mutation
  const postCommentMutation = usePostCommentMutation(issueNumber);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim() || !user) return;

    try {
      await postCommentMutation.mutateAsync(newComment);
      setNewComment('');
    } catch (err) {
      alert('Error posting comment: ' + err.message);
    }
  };

  return {
    comments,
    loading,
    error: queryError?.message || null,
    user,
    newComment,
    setNewComment,
    posting: postCommentMutation.isPending,
    visible,
    containerRef,
    handleLogin,
    handleLogout,
    handleSubmitComment,
    issueUrl: `https://github.com/${owner}/${repo}/issues/${issueNumber}`,
    hasClientId,
  };
};

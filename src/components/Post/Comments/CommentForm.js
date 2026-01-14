import React from 'react';

const CommentForm = ({
  user,
  newComment,
  setNewComment,
  posting,
  issueUrl,
  issueNumber,
  onSubmit,
  onLogout,
}) => {
  return (
    <div>
      <div>
        <img src={user.avatar_url} alt={user.login} />
        <span>
          Commenting as <strong>{user.login}</strong>
        </span>
        <button onClick={onLogout}>Sign out</button>
      </div>
      <form onSubmit={onSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment... (Markdown supported)"
          rows={5}
          disabled={posting}
        />
        <div>
          <small>
            Comments are posted on{' '}
            <a href={issueUrl} target="_blank" rel="noopener noreferrer">
              issue #{issueNumber}
            </a>
          </small>
          <button type="submit" disabled={!newComment.trim() || posting}>
            {posting ? 'Posting...' : 'Comment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;

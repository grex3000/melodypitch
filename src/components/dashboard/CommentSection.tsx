'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  body: string;
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
}

interface CommentSectionProps {
  submissionId: string;
  comments: Comment[];
  currentUser?: { id: string; name: string; email: string };
  onCommentAdded?: () => void;
}

export default function CommentSection({
  submissionId,
  comments,
  currentUser,
  onCommentAdded,
}: CommentSectionProps) {
  const [isComposing, setIsComposing] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/submissions/${submissionId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: commentText,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to post comment');
      }

      setCommentText('');
      setIsComposing(false);
      onCommentAdded?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Comment List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center py-8 text-fg-2 type-body-sm">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-bg-base rounded-lg p-4 border border-border-default">
              <div className="flex items-start gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="type-label text-fg-1 truncate">{comment.author.name}</p>
                  <p className="type-body-xs text-fg-3">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <p className="type-body-sm text-fg-2 break-words">{comment.body}</p>
            </div>
          ))
        )}
      </div>

      {/* Comment Form */}
      {currentUser && (
        <form onSubmit={handleSubmitComment} className="space-y-3">
          {!isComposing && (
            <button
              type="button"
              onClick={() => setIsComposing(true)}
              className="btn btn-secondary btn-sm w-full"
            >
              Add Comment
            </button>
          )}

          {isComposing && (
            <>
              {error && (
                <div className="bg-red-100 border border-red-300 text-red-800 px-3 py-2 rounded text-xs">
                  {error}
                </div>
              )}
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add your comment..."
                className="w-full bg-bg-base border border-border-default rounded-lg p-3 text-fg-1 placeholder-fg-3 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                rows={3}
                disabled={isSubmitting}
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsComposing(false);
                    setCommentText('');
                    setError(null);
                  }}
                  disabled={isSubmitting}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !commentText.trim()}
                  className="btn btn-primary btn-sm"
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </>
          )}
        </form>
      )}
    </div>
  );
}

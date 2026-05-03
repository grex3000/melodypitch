'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import CommentSection from './CommentSection';

interface Track {
  id: string;
  title: string;
  fileUrl: string;
  genres?: string[];
  moods?: string[];
}

interface Comment {
  id: string;
  body: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

interface SubmissionDetailProps {
  submissionId: string;
  currentUser?: { id: string; role: string };
  onStatusChange?: (status: string) => void;
}

export default function SubmissionDetail({
  submissionId,
  currentUser,
  onStatusChange,
}: SubmissionDetailProps) {
  const [submission, setSubmission] = useState<Record<string, unknown> | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchSubmission();
  }, [submissionId]);

  const fetchSubmission = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/submissions/${submissionId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch submission');
      }

      const data = await response.json();
      setSubmission(data.submission);
      setComments(data.submission.comments || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load submission');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!submission) return;

    setIsUpdatingStatus(true);
    try {
      const response = await fetch(`/api/submissions/${submissionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update submission');
      }

      const data = await response.json();
      setSubmission(data.submission);
      onStatusChange?.(newStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-fg-2">Loading submission...</div>;
  }

  if (error) {
    return <div className="py-12 text-center text-error">{error}</div>;
  }

  if (!submission) {
    return <div className="py-12 text-center text-fg-2">Submission not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800';
      case 'REVIEWED':
        return 'bg-purple-100 text-purple-800';
      case 'SHORTLISTED':
        return 'bg-yellow-100 text-yellow-800';
      case 'PITCHED':
        return 'bg-green-100 text-green-800';
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canChangeStatus = currentUser?.role === 'LABEL';
  const statusOptions = ['NEW', 'REVIEWED', 'SHORTLISTED', 'PITCHED', 'ARCHIVED'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="type-h3 text-fg-1 mb-2">
              Submission #{submission.id.slice(0, 8)}
            </h1>
            <p className="type-body-sm text-fg-3">
              {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
            </p>
          </div>

          {canChangeStatus ? (
            <div className="flex items-center gap-2">
              <label className="type-label text-fg-2">Status:</label>
              <select
                value={submission.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={isUpdatingStatus}
                className="bg-bg-base border border-border-default rounded px-3 py-2 text-fg-1 cursor-pointer disabled:opacity-50"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <span className={`px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
              {submission.status.replace(/_/g, ' ')}
            </span>
          )}
        </div>

        {submission.noteToLabel && (
           <div className="border-t border-border-default pt-4">
             <p className="type-label text-fg-2 mb-2">Songwriter&apos;s Note</p>
             <p className="type-body-sm text-fg-2">{submission.noteToLabel}</p>
           </div>
        )}
      </div>

      {/* Tracks */}
      <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
        <h2 className="type-h4 text-fg-1 mb-6">Tracks ({submission.tracks.length})</h2>

        <div className="space-y-4">
          {submission.tracks.map((track: Track) => (
            <div key={track.id} className="border border-border-default rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="type-h6 text-fg-1 mb-1">{track.title}</h3>
                  {(track.genres?.length || 0) > 0 && (
                    <p className="type-body-xs text-fg-2 mb-2">
                      Genres: {track.genres?.join(', ')}
                    </p>
                  )}
                  {(track.moods?.length || 0) > 0 && (
                    <p className="type-body-xs text-fg-2">
                      Moods: {track.moods?.join(', ')}
                    </p>
                  )}
                </div>
                <a
                  href={track.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Play
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
        <h2 className="type-h4 text-fg-1 mb-6">Discussion ({submission.comments.length})</h2>
        <CommentSection
          submissionId={submissionId}
          comments={comments}
          currentUser={currentUser}
          onCommentAdded={fetchSubmission}
        />
      </div>
    </div>
  );
}

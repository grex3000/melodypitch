'use client';

// import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Track {
  id: string;
  title: string;
  fileUrl: string;
}

interface Submission {
  id: string;
  portalId: string;
  status: 'NEW' | 'UNDER_REVIEW' | 'SELECTED' | 'REJECTED';
  noteToLabel?: string;
  createdAt: string;
  tracks: Track[];
}

interface SubmissionsListProps {
  submissions: Submission[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function SubmissionsList({
  submissions,
  loading = false,
  emptyMessage = 'No submissions yet',
}: SubmissionsListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800';
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'SELECTED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace(/_/g, ' ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-fg-2">Loading submissions...</div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="type-body-sm text-fg-2 mb-4">{emptyMessage}</p>
        <a href="/songwriter/submit" className="btn btn-primary btn-sm">
          Submit Your Work
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <div key={submission.id} className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="type-h6 text-fg-1 mb-2">Submission #{submission.id.slice(0, 8)}</h3>
              <p className="type-body-sm text-fg-3">
                {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
              {getStatusLabel(submission.status)}
            </span>
          </div>

          {/* Tracks */}
          {submission.tracks.length > 0 && (
            <div className="mb-4">
              <p className="type-label text-fg-2 mb-3">Tracks ({submission.tracks.length})</p>
              <div className="space-y-2">
                {submission.tracks.map((track) => (
                  <div key={track.id} className="flex items-center gap-3 p-2 bg-bg-base rounded">
                    <div className="flex-1 min-w-0">
                      <p className="type-body-sm text-fg-1 truncate">{track.title}</p>
                    </div>
                    <a
                      href={track.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-gold hover:text-accent-gold-hover transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Note */}
          {submission.noteToLabel && (
            <div className="border-t border-border-default pt-4">
              <p className="type-label text-fg-2 mb-2">Note to Label</p>
              <p className="type-body-sm text-fg-2">{submission.noteToLabel}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

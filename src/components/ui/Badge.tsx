import React from 'react';

type BadgeVariant = 'gold' | 'teal' | 'success' | 'warning' | 'error' | 'info';
type StatusVariant = 'pending' | 'reviewing' | 'interested' | 'passed' | 'archived';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusVariant;
  children: React.ReactNode;
}

export function Badge({ variant = 'gold', className = '', ...props }: BadgeProps) {
  return <span className={`badge badge-${variant} ${className}`} {...props} />;
}

export function StatusBadge({ status, className = '', ...props }: StatusBadgeProps) {
  return <span className={`status-${status} ${className}`} {...props} />;
}

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  asChild = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const classes = `${baseClass} ${variantClass} ${sizeClass} ${className}`;

  if (asChild) {
    return (
      <span className={classes} {...(props as React.HTMLAttributes<HTMLSpanElement>)}>
        {props.children}
      </span>
    );
  }

  return (
    <button
      className={classes}
      {...props}
    />
  );
}

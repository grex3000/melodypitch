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
    // When asChild is true, clone the child and add the classes
    const child = React.Children.only(props.children) as React.ReactElement;
    return React.cloneElement(child, {
      className: `${classes} ${child.props.className || ''}`,
    });
  }

  return (
    <button
      className={classes}
      {...props}
    />
  );
}

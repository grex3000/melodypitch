import React from 'react';

type TypographyVariant = 
  | 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' 
  | 'body-lg' | 'body' | 'body-sm' | 'label' | 'mono';

const tagMap: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  display: 'div',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  label: 'span',
  mono: 'code',
};

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  children: React.ReactNode;
}

export function Typography({
  variant,
  className = '',
  ...props
}: TypographyProps) {
  const Tag = tagMap[variant] as React.ElementType;
  const classVariant = variant.replace(/-/g, '-');

  return (
    <Tag className={`type-${classVariant} ${className}`} {...props} />
  );
}

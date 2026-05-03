import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="type-label block mb-2">
          {label}
        </label>
      )}
      <input className={`input ${className}`} id={id} {...props} />
      {error && <p className="text-error text-xs mt-1">{error}</p>}
      {helperText && <p className="text-fg-3 text-xs mt-1">{helperText}</p>}
    </div>
  );
}

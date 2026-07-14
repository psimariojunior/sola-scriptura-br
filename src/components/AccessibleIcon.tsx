import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface AccessibleIconProps {
  icon: LucideIcon;
  label?: string;
  className?: string;
  size?: number;
}

export function AccessibleIcon({
  icon: Icon,
  label,
  className,
  size,
}: AccessibleIconProps) {
  if (label) {
    return (
      <span role="img" aria-label={label} className={className}>
        <Icon className={className} size={size} aria-hidden="true" />
      </span>
    );
  }

  return <Icon className={className} size={size} aria-hidden="true" />;
}

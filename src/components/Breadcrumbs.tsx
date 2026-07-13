'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-sm text-muted-foreground ${className}`}
    >
      <ol className="flex items-center gap-1.5 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;
          const content = (
            <span
              className={`flex items-center gap-1 ${
                isLast ? 'text-foreground font-medium' : ''
              }`}
              aria-current={isLast ? 'page' : undefined}
            >
              {isFirst && <Home className="w-3.5 h-3.5" />}
              <span>{item.label}</span>
            </span>
          );

          return (
            <Fragment key={`${item.label}-${index}`}>
              <li className="flex items-center">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-foreground transition-colors duration-200 flex items-center gap-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="text-muted-foreground/50 flex items-center">
                  <ChevronRight className="w-3.5 h-3.5" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;

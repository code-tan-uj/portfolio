"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

/* ========================================================================== */
/*  Types                                                                      */
/* ========================================================================== */

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/* ========================================================================== */
/*  Component                                                                  */
/* ========================================================================== */

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className="flex items-center gap-1 flex-wrap"
        style={{ listStyle: "none", margin: 0, padding: 0 }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;

          return (
            <li key={i} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-tertiary)",
                    textDecoration: "none",
                    transition: "color var(--duration-base) var(--ease-smooth)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-tertiary)";
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-sm)",
                    color: isLast
                      ? "var(--color-text-primary)"
                      : "var(--color-text-tertiary)",
                    fontWeight: isLast ? 600 : 400,
                  }}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  size={14}
                  style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

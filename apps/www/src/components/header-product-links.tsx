"use client";

import React from "react";
import { usePathname } from "next/navigation";

import type { AppRoute } from "~/lib/routes";
import type { Frontmatter } from "~/types/frontmatter";
import { NextLink } from "~/lib/link";
import styles from "./header.module.css";

interface HeaderProductLinksProps {
  route: AppRoute;
  limit?: number;
}

export const HeaderProductLinks = ({
  route,
  limit,
}: HeaderProductLinksProps): React.JSX.Element => {
  const pathname: string = usePathname();

  return (
    <React.Fragment>
      {route.pages
        .slice(0, limit ?? route.pages.length)
        .map((page: Frontmatter): React.JSX.Element => {
          return (
            <HeaderProductLink
              key={page.slug}
              href={page.slug}
              active={
                (page.slug === "/" && pathname === page.slug) ||
                (page.slug !== "/" && pathname.startsWith(page.slug))
              }
            >
              {page.title}
            </HeaderProductLink>
          );
        })}
    </React.Fragment>
  );
};

const HeaderProductLink = ({
  href = undefined,
  active = false,
  children = undefined,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & {
  active?: boolean;
}): React.JSX.Element => (
  <NextLink href={href ? href : "#"} passHref legacyBehavior>
    <a
      data-state={active ? "active" : "inactive"}
      className={styles.HeaderProductLink}
      {...props}
    >
      <span className={styles.HeaderProductLinkInner}>{children}</span>
      <span className={styles.HeaderProductLinkInnerHidden}>{children}</span>
    </a>
  </NextLink>
);

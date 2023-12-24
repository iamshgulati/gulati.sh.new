import { siteConfig } from "~/config/site";
import type { Frontmatter } from "~/types/frontmatter";
import { getAllFrontmatter } from "./mdx";

export interface AppRoute {
  label: string;
  pages: Frontmatter[];
}

export type AllRoutes = Record<
  | "productLinks"
  | "personal"
  | "projects"
  | "blog"
  | "private"
  | "social"
  | "legal",
  AppRoute
>;

export const allRoutes: AllRoutes = {
  productLinks: {
    label: "Most Visited",
    pages: [
      { title: "Home", slug: "/", icon: "HomeIcon" },
      { title: "About", slug: "/about", icon: "PersonIcon" },
      { title: "Projects", slug: "/projects", icon: "CubeIcon" },
      { title: "Blog", slug: "/blog", icon: "FileTextIcon" },
    ],
  },
  personal: {
    label: "Personal",
    pages: [{ title: "Quotes", slug: "/quotes", icon: "QuoteIcon" }],
  },
  projects: {
    label: "Projects",
    pages: [
      ...(await getAllFrontmatter("/src/data", "/projects")).map(
        (page: Frontmatter) => {
          page.icon = "CubeIcon";
          return page;
        },
      ),
    ],
  },
  blog: {
    label: "Blog Posts",
    pages: [
      ...(await getAllFrontmatter("/src/data", "/blog")).map(
        (page: Frontmatter) => {
          page.icon = "FileTextIcon";
          return page;
        },
      ),
    ],
  },
  private: {
    label: "Private Pages",
    pages: [
      ...(await getAllFrontmatter("/src/data", "/private")).map(
        (page: Frontmatter) => {
          page.icon = "FileTextIcon";
          return page;
        },
      ),
    ],
  },
  social: {
    label: "Social",
    pages: [
      {
        title: "GitHub",
        slug: siteConfig.links.github,
        icon: "GitHubAltLogoIcon",
      },
      {
        title: "LinkedIn",
        slug: siteConfig.links.linkedin,
        icon: "LinkedInAltLogoIcon",
      },
      {
        title: "Bluesky",
        slug: siteConfig.links.bluesky,
        icon: "BlueskyLogoIcon",
      },
      {
        title: "Twitter",
        slug: siteConfig.links.twitter,
        icon: "TwitterLogoIcon",
      },
      {
        title: "Mastodon",
        slug: siteConfig.links.mastodon,
        icon: "MastodonLogoIcon",
      },
      {
        title: "Threads",
        slug: siteConfig.links.threads,
        icon: "ThreadsLogoIcon",
      },
    ],
  },
  legal: {
    label: "Legal",
    pages: [
      {
        title: "Credits",
        slug: "/credits",
        icon: "HeartIcon",
      },
      {
        title: "Privacy",
        slug: "/privacy",
        icon: "LockClosedIcon",
      },
      {
        title: "Terms",
        slug: "/terms",
        icon: "InfoCircledIcon",
      },
    ],
  },
};

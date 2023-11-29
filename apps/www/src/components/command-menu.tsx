"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Half2Icon,
  MagnifyingGlassIcon,
  MixIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { AccessibleIcon, Dialog, IconButton, Kbd } from "@radix-ui/themes";
import { Command } from "cmdk";
import { useTheme } from "next-themes";

import {
  legalNav,
  personalNav,
  professionalNav,
  socialNav,
} from "~/config/nav";
import type {
  FrontmatterKeyTypes,
  FrontmatterTypes,
} from "~/types/frontmatter";
import styles from "./command-menu.module.css";
import type { Icon } from "./icons";
import { Icons } from "./icons";

interface CommandMenuProps {
  frontmatter: Record<FrontmatterKeyTypes, FrontmatterTypes>;
}

export function CommandMenu({
  frontmatter,
}: CommandMenuProps): React.JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false);
  const router = useRouter();
  const { resolvedTheme, systemTheme, setTheme } = useTheme();

  const handleThemeToggle = React.useCallback(() => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme === systemTheme ? "system" : newTheme);
  }, [resolvedTheme, setTheme, systemTheme]);

  // Toggle CmdK Command Menu with ⌘ + K
  React.useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      const isCmdK =
        (event.metaKey || event.ctrlKey) &&
        event.key === "k" &&
        !event.shiftKey &&
        !event.altKey;
      if (isCmdK) {
        event.preventDefault();
        setOpen((open) => !open);
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [setOpen, open]);

  // Toggle theme with ⌘ + D
  React.useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      const isCmdD =
        (event.metaKey || event.ctrlKey) &&
        event.key === "d" &&
        !event.shiftKey &&
        !event.altKey;
      if (isCmdD) {
        event.preventDefault();
        handleThemeToggle();
        // updateThemeClasses();
        // updateMetaColor();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleThemeToggle]);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <IconButton
          size="3"
          variant="ghost"
          color="gray"
          onClick={() => setOpen(true)}
        >
          <AccessibleIcon label="Search website">
            <MagnifyingGlassIcon width="20" height="20" />
          </AccessibleIcon>
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content className={styles.DialogContent}>
        <Command loop>
          <Command.Input placeholder="Type a command or search..." />

          <Command.List>
            <Command.Item
              value="CmdK Command Menu: Toggle CmdK Command Menu"
              onSelect={() =>
                runCommand(() => {
                  // do nothing
                })
              }
            >
              <MixIcon />
              Toggle Command Menu
              <CommandShortcut>⌘&thinsp;K</CommandShortcut>
            </Command.Item>

            <Command.Item
              value="Theme: Toggle Theme System Light Dark"
              onSelect={() =>
                runCommand(() => {
                  handleThemeToggle();
                  // updateThemeClasses();
                  // updateMetaColor();
                })
              }
            >
              <Half2Icon
                width="16"
                height="16"
                style={{
                  display: "var(--system-theme-icon-display)",
                  transform: "rotate(45deg)",
                }}
              />
              <SunIcon
                width="16"
                height="16"
                style={{ display: "var(--light-theme-icon-display)" }}
              />
              <MoonIcon
                width="16"
                height="16"
                style={{ display: "var(--dark-theme-icon-display)" }}
              />
              Toggle Theme
              <CommandShortcut>⌘&thinsp;D</CommandShortcut>
            </Command.Item>

            {professionalNav.mainNav.length ? (
              <Command.Group heading="Professional">
                {professionalNav.mainNav.map((item) => {
                  const ItemIcon: Icon = Icons[item.icon ?? "FileIcon"];
                  return (
                    <Command.Item
                      key={item.href}
                      value={`Professional Site Pages: ${item.title}`}
                      data-disabled={item.disabled}
                      onSelect={() => {
                        runCommand(() => router.push(item.href as string));
                      }}
                    >
                      <ItemIcon />
                      {item.title}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ) : null}

            {personalNav.mainNav.length ? (
              <Command.Group heading="Personal">
                {personalNav.mainNav.map((item) => {
                  const ItemIcon: Icon = Icons[item.icon ?? "FileIcon"];
                  return (
                    <Command.Item
                      key={item.href}
                      value={`Personal Site Pages: ${item.title}`}
                      data-disabled={item.disabled}
                      onSelect={() => {
                        runCommand(() => router.push(item.href as string));
                      }}
                    >
                      <ItemIcon />
                      {item.title}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ) : null}

            {socialNav.mainNav.length ? (
              <Command.Group heading="Social">
                {socialNav.mainNav.map((item) => {
                  const ItemIcon: Icon = Icons[item.icon ?? "AtSymbolIcon"];
                  return (
                    <Command.Item
                      key={item.href}
                      value={`Social Links: ${item.title}`}
                      data-disabled={item.disabled}
                      onSelect={() => {
                        runCommand(() => router.push(item.href as string));
                      }}
                    >
                      <ItemIcon />
                      {item.title}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ) : null}

            {frontmatter.blogPosts.length ? (
              <Command.Group heading="Blog Posts">
                {frontmatter.blogPosts.map((post) => {
                  const ItemIcon: Icon = Icons[post.icon ?? "FileTextIcon"];
                  return (
                    <Command.Item
                      key={post.slug}
                      value={`Blog Posts: ${post.title}`}
                      onSelect={() => {
                        runCommand(() => router.push(post.slug));
                      }}
                    >
                      <ItemIcon />
                      {post.title}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ) : null}

            {frontmatter.projects.length ? (
              <Command.Group heading="Projects">
                {frontmatter.projects.map((project) => {
                  const ItemIcon: Icon = Icons[project.icon ?? "CubeIcon"];
                  return (
                    <Command.Item
                      key={project.slug}
                      value={`Projects: ${project.title}`}
                      onSelect={() => {
                        runCommand(() => router.push(project.slug));
                      }}
                    >
                      <ItemIcon />
                      {project.title}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ) : null}

            {frontmatter.thoughts.length ? (
              <Command.Group heading="Thoughts">
                {frontmatter.thoughts.map((thought) => {
                  const ItemIcon: Icon =
                    Icons[thought.icon ?? "CrumpledPaperIcon"];
                  return (
                    <Command.Item
                      key={thought.slug}
                      value={`Thoughts: ${thought.title}`}
                      onSelect={() => {
                        runCommand(() => router.push(thought.slug));
                      }}
                    >
                      <ItemIcon />
                      {thought.title}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ) : null}

            {legalNav.mainNav.length ? (
              <Command.Group heading="Legal">
                {legalNav.mainNav.map((item) => {
                  const ItemIcon: Icon = Icons[item.icon ?? "FileTextIcon"];
                  return (
                    <Command.Item
                      key={item.href}
                      value={`Legal Site Pages: ${item.title}`}
                      data-disabled={item.disabled}
                      onSelect={() => {
                        runCommand(() => router.push(item.href as string));
                      }}
                    >
                      <ItemIcon />
                      {item.title}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ) : null}

            <Command.Empty>No results found</Command.Empty>
          </Command.List>
        </Command>
      </Dialog.Content>
    </Dialog.Root>
  );
}

const CommandShortcut = ({ children }: React.PropsWithChildren) => (
  <Kbd
    style={{
      marginLeft: "auto",
    }}
  >
    {children}
  </Kbd>
);
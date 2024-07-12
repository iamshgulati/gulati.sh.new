import React from "react";
import { IconButton } from "@radix-ui/themes";

import type { Icon } from "./icons";
import { Icons } from "./icons";

type LinkSocialIconButtonProps = React.ComponentProps<typeof IconButton> & {
  href: string;
  icon?: keyof typeof Icons;
  ariaLabel: string;
  iconProps?: React.ComponentProps<Icon>;
};

export const LinkSocialIconButton = ({
  href,
  icon = "Link2Icon",
  ariaLabel,
  iconProps = { width: "16", height: "16" },
  ...props
}: LinkSocialIconButtonProps): React.JSX.Element => {
  const SocialIcon: Icon = Icons[icon];

  return (
    <IconButton asChild size="3" variant="ghost" color="gray" {...props}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        color="gray"
        style={{
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <SocialIcon aria-label={ariaLabel} {...iconProps} />
      </a>
    </IconButton>
  );
};
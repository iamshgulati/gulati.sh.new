import React from "react";
import { Theme } from "@radix-ui/themes";

import { env } from "~/env";
import { cn } from "~/lib/classnames";

export const RadixThemesProvider = ({
  ...props
}: React.ComponentProps<typeof Theme>): React.JSX.Element => (
  <Theme
    hasBackground
    accentColor="indigo"
    grayColor="auto"
    panelBackground="translucent"
    scaling="100%"
    radius="medium"
    appearance="inherit"
    className={cn(env.WWW_USE_CUSTOM_FONTS && "radix-themes-custom-fonts")}
    {...props}
  />
);
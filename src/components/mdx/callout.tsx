import React from "react";
import { Callout as RTCallout } from "@radix-ui/themes";

import type { Icon } from "~/components/icons";
import { Icons } from "~/components/icons";

type CalloutProps = React.PropsWithChildren<{
  icon?: keyof typeof Icons;
}> &
  React.ComponentPropsWithoutRef<typeof RTCallout.Root>;

export const Callout = ({
  icon = "InfoCircledIcon",
  children = undefined,
}: CalloutProps): React.JSX.Element => {
  const ComputedIcon: Icon = Icons[icon];
  return (
    <RTCallout.Root variant="surface" mt="5" mb="5">
      <RTCallout.Icon>
        <ComputedIcon />
      </RTCallout.Icon>
      <RTCallout.Text>{children}</RTCallout.Text>
    </RTCallout.Root>
  );
};
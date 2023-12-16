"use client";

import React from "react";
import { Box } from "@radix-ui/themes";

import { CopyCodeButton } from "./copy-code-button";
import { Pre } from "./pre";

export const PreWithCopyButton = ({ ...props }): React.JSX.Element => {
  const [code, setCode] = React.useState<string>();

  return (
    <Box>
      <Pre
        {...props}
        ref={(node: HTMLPreElement | null): void => {
          if (node) {
            const codeElement: HTMLElement | null = node.querySelector("code");
            const code: string | undefined = codeElement?.innerText.replace(
              /\n{2}/g,
              "\n",
            );
            setCode(code);
          }
        }}
      />
      <CopyCodeButton code={code} />
    </Box>
  );
};

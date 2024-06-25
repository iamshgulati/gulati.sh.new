import React from "react";
import { Heading } from "@radix-ui/themes";

export const HeroHeading = ({
  variant = "sans",
  ...props
}: React.ComponentProps<typeof Heading> & {
  variant?: "sans" | "serif";
}): React.JSX.Element => {
  let headingStyle: React.CSSProperties = {
    fontWeight: "700",
    "--heading-font-family": "var(--font-heading), var(--default-font-family)",
    "--heading-letter-spacing": "-0.025em",
    ...props.style,
  } as React.CSSProperties;

  if (variant === "serif") {
    headingStyle = {
      fontWeight: "650",
      "--heading-font-family": "var(--font-serif), var(--em-font-family)",
      "--heading-letter-spacing": "0.01em",
      ...props.style,
    } as React.CSSProperties;
  }

  return (
    <Heading
      {...props}
      size={{ initial: "1", xs: "5", sm: "6", md: "8" }}
      style={
        {
          "--heading-font-size-adjust": "3.5",
          lineHeight:
            "calc(var(--line-height) * var(--heading-font-size-adjust) * 0.9)",
          ...headingStyle,
        } as React.CSSProperties
      }
    />
  );
};

export const PageHeading = ({
  variant = "sans",
  ...props
}: React.ComponentProps<typeof Heading> & {
  variant?: "sans" | "serif";
}): React.JSX.Element => {
  let headingStyles: React.CSSProperties = {
    fontWeight: "700",
    "--heading-font-family": "var(--font-heading), var(--default-font-family)",
    "--heading-letter-spacing": "-0.025em",
    ...props.style,
  } as React.CSSProperties;

  if (variant === "serif") {
    headingStyles = {
      fontWeight: "650",
      "--heading-font-family": "var(--font-serif), var(--em-font-family)",
      "--heading-letter-spacing": "0.01em",
      ...props.style,
    } as React.CSSProperties;
  }

  return (
    <Heading
      {...props}
      size="8"
      style={
        {
          "--heading-font-size-adjust": "1.0",
          lineHeight:
            "calc(var(--line-height) * var(--heading-font-size-adjust) * 1.0)",
          ...headingStyles,
        } as React.CSSProperties
      }
    />
  );
};

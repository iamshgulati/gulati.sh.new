import React from "react";
import { ArrowTopRightIcon, PersonIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Link, Section, Text } from "@radix-ui/themes";

import { HeroHeading } from "~/components/page-heading";
import { siteConfig } from "~/config/site";
import { NextLink } from "~/lib/link";

export default function HomePage(): React.JSX.Element {
  return (
    <React.Fragment>
      <Section size={{ initial: "2", xs: "3" }}>
        <Box
          mx={{ initial: "4", xs: "5", sm: "6", md: "9" }}
          mb={{ initial: "4", xs: "6" }}
        >
          <HeroHeading as="h1">Hello! I&apos;m Shubham Gulati,</HeroHeading>
        </Box>
        <Box mx={{ initial: "4", xs: "5", sm: "6", md: "9" }}>
          <Flex
            direction={{ initial: "column", md: "row-reverse" }}
            gap={{ initial: "4", xs: "5" }}
          >
            <Box>
              <Text as="p" size={{ initial: "3", xs: "4", sm: "5" }} mb="4">
                Past — Senior Technology Consultant @ Deloitte Consulting.
                Software Engineer and Certified Cloud Architect.
              </Text>
              <Text
                as="p"
                size={{ initial: "3", xs: "4", sm: "5" }}
                color="gray"
              >
                I love tinkering with code. And, currently I am{" "}
                <s>
                  learning the craft of designing high-performance cloud
                  architectures and minimalistic front-end interfaces
                </s>{" "}
                <Text style={{ color: "var(--gray-12)" }}>
                  just trying to figure out what do I want to do with my life.
                </Text>
              </Text>
            </Box>
            <Box>
              <Text
                as="p"
                size={{ initial: "3", xs: "4", sm: "5" }}
                color="gray"
                mb="5"
              >
                Here&apos;s many useless facts about some{" "}
                <Text weight="bold" style={{ color: "var(--gray-12)" }}>
                  less useless things
                </Text>{" "}
                that I do.
              </Text>
              <Flex
                direction={{ initial: "column", xs: "row" }}
                gap={{ initial: "3", xs: "5" }}
                style={{
                  textAlign: "center",
                }}
              >
                <NextLink href="/about">
                  <Button
                    size="3"
                    style={{
                      width: "100%",
                      paddingLeft: "var(--space-5)",
                      paddingRight: "var(--space-5)",
                    }}
                  >
                    <PersonIcon width="18" height="18" aria-hidden />
                    <Text>ABOUT</Text>
                  </Button>
                </NextLink>
                <Link
                  href={siteConfig.links.resume}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    variant="soft"
                    size="3"
                    style={{
                      width: "100%",
                      paddingLeft: "var(--space-5)",
                      paddingRight: "var(--space-5)",
                    }}
                  >
                    <ArrowTopRightIcon width="18" height="18" aria-hidden />
                    <Text>RESUME</Text>
                  </Button>
                </Link>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Section>
    </React.Fragment>
  );
}

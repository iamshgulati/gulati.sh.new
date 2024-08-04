import React from "react";
import { Box, Flex, Heading } from "@radix-ui/themes";

import type { Frontmatter } from "~/types/frontmatter";
import { PagePreviewCard } from "~/components/page-preview-card";
import { dynamicRoutes } from "~/lib/routes";

export const BlogSection = (): React.JSX.Element => (
  <React.Fragment>
    <Box mb="7">
      <Heading as="h2" size="7">
        Latest Posts
      </Heading>
    </Box>
    <Flex direction="column" gap="6">
      {dynamicRoutes.blog.pages
        ?.slice(0, 3)
        .map((page: Frontmatter) => (
          <PagePreviewCard
            key={page.slug}
            slug={page.slug}
            title={page.title}
            description={page.description}
            publishedAt={page.publishedAt}
          />
        ))}
    </Flex>
  </React.Fragment>
);
import React from "react";
import { Flex } from "@radix-ui/themes";

import styles from "./ul.module.css";

export const Ul = ({ ...props }): React.JSX.Element => (
  <Flex asChild direction="column" gap="1" mt="2" mb="3">
    <ul className={styles.List} {...props} />
  </Flex>
);
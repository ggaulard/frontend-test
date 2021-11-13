import React from "react";
import { Box } from "@aircall/tractor";

import styles from "./HeaderList.module.css";

export interface HeaderListDataStruct {
  headers: {
    header: React.ReactElement | string;
    headerRef: string;
    items: { item: React.ReactElement | string; ref: string }[];
  }[];
}

interface Props {
  data: HeaderListDataStruct;
}

export default function HeaderList({ data }: Props) {
  return (
    <Box className={styles.list}>
      {data.headers.map(({ header, headerRef, items }) => (
        <React.Fragment key={headerRef}>
          <Box className={styles.header} bg="grey.light" p={3}>
            {header}
          </Box>
          {items.map(({ item, ref }) => (
            <React.Fragment key={ref}>{item}</React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
}

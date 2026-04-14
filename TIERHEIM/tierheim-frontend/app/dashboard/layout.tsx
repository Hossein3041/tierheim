"use client";

import Header from "@app/_components/Header/header";
import { useScreenSize } from "@app/_util/useScreenSize";
import { Stack, useTheme } from "@mui/material";
import React from "react";
import { PropsWithChildren, useState } from "react";
import { SearchQueryContext } from "./SearchQueryContext";


export default function DashboardLayout({ children }: PropsWithChildren) {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  const { isTablet, isMobile } = useScreenSize();

  return (
    <Stack
      minHeight="100%"
      px={isMobile ? "0" : isTablet ? "2rem" : "5rem"}
      justifyContent="center"
      alignItems="stretch"
      sx={{ overflowX: "hidden", bgcolor: theme.palette.home.background }}
    >
      <Header onSearch={(q) => setSearchQuery(q)} />
      <SearchQueryContext.Provider value={{ searchQuery }}>
        {children}
      </SearchQueryContext.Provider>
    </Stack>
  );
}

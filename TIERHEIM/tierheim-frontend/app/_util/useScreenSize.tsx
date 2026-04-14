import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";

// Breakpoints based on MUI default theme
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

export const useScreenSize = () => {
  const betweenMdAndLg = 1000;

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery((theme) =>
    theme.breakpoints.down(betweenMdAndLg),
  );
  const isDesktop = useMediaQuery((theme) =>
    theme.breakpoints.up(betweenMdAndLg),
  );
  const isLargeDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  };
};

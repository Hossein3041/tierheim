import * as React from "react";
import { Box, Link, SxProps, Theme, useTheme } from "@mui/material";
import { LOGINTEXTS } from "@/constants/texts/Texts";
import { BoxProps } from "@mui/material";

export interface FooterBoxProps extends BoxProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  linkText?: string;
  linkHref?: string;
}

export const FooterBox: React.FC<FooterBoxProps> = ({
  onMouseEnter,
  onMouseLeave,
  linkText = LOGINTEXTS.passwordReset,
  linkHref = "#",
  sx = {},
  ...restBoxProps
}) => {
  const theme = useTheme();
  const palette = theme.palette.login;

  const internalStyles: SxProps<Theme> = {
    width: "100%",
    boxSizing: "border-box",
    mt: 2,
    py: 1,
    minHeight: 36,
    display: "flex",
    justifyContent: "center",
    transition: "box-shadow 0.3s ease",
    backgroundColor: palette.loginCard2BackgroundColor,
  };

  const mergedStyles: SxProps<Theme> = {
    ...internalStyles,
    ...sx,
  };

  return (
    <Box {...restBoxProps} sx={mergedStyles}>
      <Link
        href={linkHref}
        variant="body2"
        sx={{
          color: palette.loginLinkColor,
          textDecoration: "none",
          opacity: 0.8,
          transition: "color 0.3s ease, opacity 0.3s ease",
          "&:hover": {
            color: palette.loginLinkHoverColor,
            opacity: 1,
          },
        }}
      >
        {linkText}
      </Link>
    </Box>
  );
};

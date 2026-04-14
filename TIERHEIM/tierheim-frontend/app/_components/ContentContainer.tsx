import { useScreenSize } from "@app/_util/useScreenSize";
import { Box, Stack, useTheme } from "@mui/material";

export function ContentContainer({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const palette = theme.palette.animalFile;
  const { isMobile } = useScreenSize();

  return (
    <Box
      sx={{
        backgroundColor: palette.tabActiveText,
        borderTop: `20px solid ${palette.tabText}`,
        borderRadius: 5,
        p: isMobile ? 1 : 2,
        py: isMobile ? 1.5 : 3,
      }}
    >
      <Stack justifyContent={"center"}>{children}</Stack>
    </Box>
  );
}

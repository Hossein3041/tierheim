import { Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography variant={"h2"}>{"Page not found :'("}</Typography>
    </Stack>
  );
}

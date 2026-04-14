import { Stack, Typography } from "@mui/material";

export function CustomErrorComponent() {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      direction={"row"}
      sx={{ width: "100%", height: "100%" }}
    >
      <Typography variant={"h4"}>
        Es ist ein schwerwiegender Fehler aufgetreten
      </Typography>
    </Stack>
  );
}

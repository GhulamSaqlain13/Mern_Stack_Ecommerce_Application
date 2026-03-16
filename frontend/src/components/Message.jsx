import React from "react";
import { Alert, Stack } from "@mui/material";

const Message = ({ severity = "info", children }) => {
  return (
    <Stack sx={{ width: "100%", my: 2 }}>
      <Alert severity={severity}>{children}</Alert>
    </Stack>
  );
};

export default Message;

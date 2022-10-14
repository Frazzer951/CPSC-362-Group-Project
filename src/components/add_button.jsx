import React from "react";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function AddButton(props) {
  const { onClick } = props;

  return (
    <IconButton
      sx={{
        position: "absolute",
        bottom: 16,
        right: 16,
        backgroundColor: "secondary.main",
        color: "white",
        ":hover": {
          bgcolor: "primary.main",
          color: "white",
        },
      }}
      size="large"
      onClick={() => {
        onClick();
      }}
    >
      <Add fontSize="inherit" />
    </IconButton>
  );
}

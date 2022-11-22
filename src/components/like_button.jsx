import { ThumbUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";

import React from "react";

export default function LikeButton(props) {
  const { onClick, likes, liked } = props;
  const [bgColor, setBgColor] = useState("secondary.main");
  const [hoverColor, setHoverColor] = useState("primary.main");

  useEffect(() => {
    if (liked) {
      setBgColor("primary.main");
      setHoverColor("secondary.main");
    } else {
      setBgColor("secondary.main");
      setHoverColor("primary.main");
    }
  }, [liked]);

  return (
    <IconButton
      sx={{
        backgroundColor: bgColor,
        color: "white",
        ":hover": {
          bgcolor: hoverColor,
          color: "white",
        },
      }}
      size="small"
      onClick={() => onClick(liked)}
    >
      <ThumbUp fontSize="inherit" />
      {likes}
    </IconButton>
  );
}

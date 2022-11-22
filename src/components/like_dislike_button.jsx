import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";

import React from "react";

export default function LikeDislikeButton(props) {
  const { onClick, likes, dislikes, rated } = props;
  const [bgColor, setBgColor] = useState("secondary.main");
  const [hoverColor, setHoverColor] = useState("primary.main");

  useEffect(() => {
    if (rated) {
      setBgColor("primary.main");
      setHoverColor("secondary.main");
    } else {
      setBgColor("secondary.main");
      setHoverColor("primary.main");
    }
  }, [rated]);

  return (
    <>
      <IconButton
        sx={{
          margin: "0.2rem",
          backgroundColor: bgColor,
          color: "white",
          ":hover": {
            bgcolor: hoverColor,
            color: "white",
          },
        }}
        size="small"
        onClick={() => onClick(rated, true)}
      >
        <ThumbUp fontSize="inherit" />
        {likes}
      </IconButton>

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
        onClick={() => onClick(rated, false)}
      >
        <ThumbDown fontSize="inherit" />
        {dislikes}
      </IconButton>
    </>
  );
}

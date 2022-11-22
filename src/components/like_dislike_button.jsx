import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";

import React from "react";

export default function LikeDislikeButton(props) {
  const { onClick, likes, dislikes, liked, disliked } = props;
  const [likeBgColor, setLikeBgColor] = useState("secondary.main");
  const [likeHoverColor, setLikeHoverColor] = useState("primary.main");
  const [dislikeBgColor, setDislikeBgColor] = useState("secondary.main");
  const [dislikeHoverColor, setDislikeHoverColor] = useState("primary.main");

  useEffect(() => {
    if (liked) {
      setLikeBgColor("primary.main");
      setLikeHoverColor("secondary.main");
    } else {
      setLikeBgColor("secondary.main");
      setLikeHoverColor("primary.main");
    }

    if (disliked) {
      setDislikeBgColor("primary.main");
      setDislikeHoverColor("secondary.main");
    } else {
      setDislikeBgColor("secondary.main");
      setDislikeHoverColor("primary.main");
    }
  }, [liked, disliked]);

  return (
    <>
      <IconButton
        sx={{
          margin: "0.2rem",
          backgroundColor: likeBgColor,
          color: "white",
          ":hover": {
            bgcolor: likeHoverColor,
            color: "white",
          },
        }}
        size="small"
        onClick={() => onClick(liked, disliked, true)}
      >
        <ThumbUp fontSize="inherit" />
        {likes}
      </IconButton>

      <IconButton
        sx={{
          backgroundColor: dislikeBgColor,
          color: "white",
          ":hover": {
            bgcolor: dislikeHoverColor,
            color: "white",
          },
        }}
        size="small"
        onClick={() => onClick(liked, disliked, false)}
      >
        <ThumbDown fontSize="inherit" />
        {dislikes}
      </IconButton>
    </>
  );
}

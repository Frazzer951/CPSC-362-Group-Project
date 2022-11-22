import { Box, IconButton, Menu, MenuItem, Modal, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import EditPost from "./edit_post";
import LikeDislikeButton from "./like_dislike_button";

export default function Post(props) {
  let { post, postID, flipRefresh } = props;
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [display, setDisplay] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (auth.logged_in && auth.userID === post.user_id) {
      console.log("Setting to true");
      setDisplay(true);
    } else {
      console.log("Setting to false");
      setDisplay(false);
    }
  }, [auth, post.user_id]);

  useEffect(() => {
    // TODO: Query backend if user has liked post
    setLiked(false);
    setDisliked(false);
  }, [auth]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    flipRefresh();
  };

  const onEditClick = () => {
    handleClose();
    setOpenEdit(true);
  };

  const onDeleteClick = async () => {
    await axios
      .delete(`/posts/?user_id=${auth.userID}&post_id=${postID}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    navigate("./..");
  };

  const OnRate = async (liked, disliked, like) => {
    // TODO: Make API Calls
    if (auth.logged_in) {
      if ((liked && like) || (disliked && !like)) {
        // Call Unrate API Function
        console.log("remove");
      } else {
        if (like) {
          // Call Like API
          console.log("like");
        } else {
          // Call Dislike API
          console.log("dislike");
        }
      }

      flipRefresh();
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Paper sx={{ minWidth: 275, margin: "0.5rem" }}>
        <Box sx={{ padding: "1rem" }}>
          <Typography variant="body2">{post.username}</Typography>
          <Typography variant="h3" component="div">
            {post.title}
          </Typography>
          <Typography variant="body1">{post.body}</Typography>
        </Box>

        <Box sx={{ position: "absolute", bottom: "0.1rem", right: "1rem" }}>
          <LikeDislikeButton
            onClick={OnRate}
            likes={Math.floor(Math.random() * 101)}
            dislikes={Math.floor(Math.random() * 101)}
            liked={liked}
            disliked={disliked}
          />
        </Box>

        <Box sx={{ position: "absolute", top: "0.1rem", right: "0.5rem" }}>
          {display ? (
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          ) : (
            <></>
          )}
        </Box>
      </Paper>

      {display ? (
        <>
          <Menu
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "secondary.light",
              },
            }}
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={onEditClick}>Edit</MenuItem>
            <MenuItem onClick={onDeleteClick}>Delete</MenuItem>
          </Menu>

          <Modal open={openEdit} onClose={handleCloseEdit}>
            <EditPost post={post} userID={auth.userID} postID={postID} onFinish={handleCloseEdit} />
          </Modal>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}

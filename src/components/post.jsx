import { Box, IconButton, Menu, MenuItem, Modal, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import EditPost from "./edit_post";
import LikeDislikeButton from "./like_dislike_button";

export default function Post(props) {
  let { post, postID, refresh, flipRefresh } = props;
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
    console.log(auth);
    if (auth.logged_in) {
      axios
        .get(`/posts/likes/?user_id=${auth.userID}&post_id=${postID}`)
        .then(function (response) {
          let data = response.data;
          console.log(data);
          if (data.has_rated) {
            if (data.like) {
              setLiked(true);
              setDisliked(false);
            } else {
              setLiked(false);
              setDisliked(true);
            }
          } else {
            setLiked(false);
            setDisliked(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setLiked(false);
      setDisliked(false);
    }
  }, [auth, postID, refresh]);

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
    if (auth.logged_in) {
      if ((liked && like) || (disliked && !like)) {
        console.log("remove");

        await axios
          .delete(`/posts/likes/?user_id=${auth.userID}&post_id=${postID}`)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        if (like) {
          console.log("like");
        } else {
          console.log("dislike");
        }

        await axios
          .post(`/posts/likes/?user_id=${auth.userID}&post_id=${postID}&like_state=${like}`)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
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
          <LikeDislikeButton onClick={OnRate} likes={post.likes} dislikes={post.dislikes} liked={liked} disliked={disliked} />
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

import { Box, IconButton, Menu, MenuItem, Modal, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AuthContext from "../context/AuthProvider";
import EditPost from "./edit_post";

export default function Post(props) {
  let { post, flipRefresh } = props;
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [display, setDisplay] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    // TODO: User userID instead of admin
    if (auth.logged_in && auth.isAdmin === 1) {
      console.log("Setting to true");
      setDisplay(true);
    } else {
      console.log("Setting to false");
      setDisplay(false);
    }
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
          </Menu>

          <Modal open={openEdit} onClose={handleCloseEdit}>
            <EditPost post={post} onFinish={handleCloseEdit} />
          </Modal>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}

import { Box, IconButton, Menu, MenuItem, Modal, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import EditThread from "./edit_thread";

export default function Thread(props) {
  let { thread, flipRefresh } = props;
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [display, setDisplay] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
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

  const onDeleteClick = async () => {
    await axios
      .delete(`/threads/?user_id=${auth.userID}&thread_id=${thread.thread_id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    flipRefresh();
    handleClose();
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Paper sx={{ minWidth: 275, margin: "0.5rem" }}>
        <Link style={{ textDecoration: "none", color: "black" }} to={`/${thread.thread_id}`}>
          <Box sx={{ padding: "1rem" }}>
            <Typography variant="h5" component="div">
              {thread.name}
            </Typography>
            <Typography variant="body2">{thread.description}</Typography>
          </Box>
        </Link>
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
            <EditThread thread={thread} userID={auth.userID} onFinish={handleCloseEdit} />
          </Modal>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}

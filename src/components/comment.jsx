import { Box, IconButton, Menu, MenuItem, Modal, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AuthContext from "../context/AuthProvider";
import EditComment from "./edit_comment";

export default function Comment(props) {
  let { comment, flipRefresh } = props;
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [display, setDisplay] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (auth.logged_in && auth.userID === comment.user_id) {
      console.log("Setting to true");
      setDisplay(true);
    } else {
      console.log("Setting to false");
      setDisplay(false);
    }
  }, [auth, comment.user_id]);

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
      <Paper sx={{ minWidth: 275, margin: "0.5rem", backgroundColor: "secondary.main" }}>
        <Box sx={{ padding: "1rem" }}>
          <Typography variant="body2">{comment.username}</Typography>
          <Typography variant="body1">{comment.body}</Typography>
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
            <EditComment comment={comment} userID={auth.userID} onFinish={handleCloseEdit} />
          </Modal>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}

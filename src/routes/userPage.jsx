import { Card, CardContent, CardHeader, Divider, IconButton, Menu, MenuItem, Modal, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "../api/axios";
import EditAboutMe from "../components/edit_about_me";
import AuthContext from "../context/AuthProvider";

export default function UserPage() {
  let { userID } = useParams();
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [display, setDisplay] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState();
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (auth.logged_in && auth.userID === userID) {
      console.log("Setting to true");
      setDisplay(true);
    } else {
      console.log("Setting to false");
      setDisplay(false);
    }
  }, [auth, userID]);

  useEffect(() => {
    axios
      .get(`/users/${userID}`)
      .then((res) => {
        console.log(res);
        let username = res.data.username;
        let about_me = res.data.about_me;
        if (!about_me) {
          about_me = "Write something about yourself!";
        }
        setUser({
          username: username,
          about_me: about_me,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userID, refresh]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setRefresh(!refresh);
  };

  const onEditClick = () => {
    handleClose();
    setOpenEdit(true);
  };

  return (
    <div>
      {user ? (
        <>
          <Typography variant="h3" sx={{ paddingTop: "1rem" }}>
            {user.username}
          </Typography>

          <Divider />

          <Card sx={{ backgroundColor: "secondary.main" }}>
            <CardHeader
              action={
                display ? (
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                ) : (
                  <></>
                )
              }
              title="About Me"
            />

            <CardContent>
              <Typography variant="h6">{user.about_me}</Typography>
            </CardContent>
          </Card>

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
                <EditAboutMe about_me={user.about_me} userID={userID} onFinish={handleCloseEdit} />
              </Modal>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

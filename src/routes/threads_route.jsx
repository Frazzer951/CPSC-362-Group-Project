import { Box, Divider, Modal, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import AddButton from "../components/add_button";
import CreateThread from "../components/create_thread";
import Thread from "../components/thread";

export default function Threads() {
  const [threads, setThreads] = useState();
  const [refresh, setRefresh] = useState(false);
  const [display, setDisplay] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.logged_in && auth.isAdmin === 1) {
      console.log("Setting to true");
      setDisplay(true);
    } else {
      console.log("Setting to false");
      setDisplay(false);
    }
  }, [auth]);

  useEffect(() => {
    axios
      .get("/threads")
      .then((res) => {
        console.log(res);
        setThreads(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const [open, setOpen] = useState(false);
  const onAddClick = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRefresh(!refresh);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ padding: "1rem" }}>
        Threads
      </Typography>

      <Divider />

      {threads ? (
        <Box>
          {threads.map((thread) => (
            <Thread thread={thread} />
          ))}
        </Box>
      ) : (
        <h2>Loading</h2>
      )}

      {display ? (
        <>
          <Modal open={open} onClose={handleClose}>
            <CreateThread />
          </Modal>

          <AddButton onClick={onAddClick} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

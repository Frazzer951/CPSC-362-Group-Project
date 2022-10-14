import { Box, Divider, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import axios from "../api/axios";
import AddButton from "../components/add_button";
import AddThread from "../components/add_thread";
import Thread from "../components/thread";

export default function Threads() {
  const [threads, setThreads] = useState();
  const [refresh, setRefresh] = useState(false);

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

      <Modal open={open} onClose={handleClose}>
        <AddThread />
      </Modal>

      <AddButton onClick={onAddClick} />
    </div>
  );
}

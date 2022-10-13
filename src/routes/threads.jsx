import { Box, Divider, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";

import axios from "../api/axios";
import Thread from "../components/thread";

export default function Threads() {
  const [threads, setThreads] = useState();

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
  }, []);

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

      <IconButton
        sx={{ position: "absolute", bottom: 16, right: 16, backgroundColor: "secondary.main", color: "white" }}
        disableRipple
        size="large"
      >
        <Add fontSize="inherit" />
      </IconButton>
    </div>
  );
}

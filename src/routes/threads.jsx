import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import axios from "../api/axios";
import Thread from "../components/thread";
import AddButton from "../components/add_button";

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

  const onAddClick = () => {
    console.log("clicked");
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

      <AddButton onClick={onAddClick} />
    </div>
  );
}

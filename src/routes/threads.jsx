import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { api } from "../api";
import Thread from "../components/thread";

export default function Threads() {
  const [threads, setThreads] = useState();

  useEffect(() => {
    api
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
    </div>
  );
}

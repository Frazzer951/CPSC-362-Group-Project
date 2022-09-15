import { Box, Divider, Typography } from "@mui/material";
import { getThreads } from "../data";
import Thread from "../components/thread";

export default function Threads() {
  let threads = getThreads();
  return (
    <div>
      <Typography variant="h4" sx={{ padding: "1rem" }}>
        Threads
      </Typography>
      <Divider />
      <Box>
        {threads.map((thread) => (
          <Thread thread={thread} />
        ))}
      </Box>
    </div>
  );
}

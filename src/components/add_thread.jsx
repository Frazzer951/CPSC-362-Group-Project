import { Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  p: 4,
  borderRadius: 3,
};

export default function AddThread() {
  const [threadName, setThreadName] = useState("");
  const [threadDesc, setThreadDesc] = useState("");

  const onNameChange = (e) => setThreadName(e.target.value);
  const onDescChange = (e) => setThreadDesc(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`threadName: ${threadName}`);
    console.log(`threadDesc: ${threadDesc}`);
  };

  return (
    <Container sx={style} maxWidth="sm">
      <Box sx={{ display: "grid" }}>
        <TextField
          onChange={onNameChange}
          value={threadName}
          label={"Thread Name"}
          variant="outlined"
          margin="dense"
          required
        />
        <TextField onChange={onDescChange} value={threadDesc} label={"Thread Description"} variant="outlined" margin="dense" />

        <Button onClick={handleSubmit} variant="contained">
          Create Thread
        </Button>
      </Box>
    </Container>
  );
}

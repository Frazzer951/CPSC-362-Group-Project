import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

import axios from "../api/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  p: 4,
  borderRadius: 3,
};

export default function CreateThread() {
  const [threadName, setThreadName] = useState("");
  const [threadDesc, setThreadDesc] = useState("");

  const onNameChange = (e) => setThreadName(e.target.value);
  const onDescChange = (e) => setThreadDesc(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`threadName: ${threadName}`);
    console.log(`threadDesc: ${threadDesc}`);

    axios
      .post(`/threads/?name=${threadName}&desc=${threadDesc}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container sx={style} maxWidth="sm">
      <Box sx={{ display: "grid" }}>
        <Typography variant="h3">Create Thread</Typography>

        <TextField
          onChange={onNameChange}
          value={threadName}
          label={"Thread Name"}
          variant="outlined"
          margin="dense"
          required
        />
        <TextField
          onChange={onDescChange}
          value={threadDesc}
          label={"Thread Description"}
          variant="outlined"
          margin="dense"
          required
        />

        <Button onClick={handleSubmit} variant="contained">
          Create Thread
        </Button>
      </Box>
    </Container>
  );
}
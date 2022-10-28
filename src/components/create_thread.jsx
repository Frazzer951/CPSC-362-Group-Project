import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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

export default function CreateThread(props) {
  let { onFinish } = props;
  const [threadName, setThreadName] = useState("");
  const [threadDesc, setThreadDesc] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");
  const [descError, setDescError] = useState(false);
  const [descErrorText, setDescErrorText] = useState("");

  const nameLimit = 128;
  const descLimit = 128;

  useEffect(() => {
    setErrMsg("");
  }, [threadName, threadDesc]);

  useEffect(() => {
    if (threadName.length > nameLimit) {
      setNameError(true);
      setNameErrorText(`Exceeds Character Limit of ${nameLimit}`);
    } else {
      setNameError(false);
      setNameErrorText("");
    }
  }, [threadName]);

  useEffect(() => {
    if (threadDesc.length > descLimit) {
      setDescError(true);
      setDescErrorText(`Exceeds Character Limit of ${descLimit}`);
    } else {
      setDescError(false);
      setDescErrorText("");
    }
  }, [threadDesc]);

  const onNameChange = (e) => setThreadName(e.target.value);
  const onDescChange = (e) => setThreadDesc(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (threadName === "" || threadDesc === "") {
      setErrMsg("Missing Name or Description");
      return;
    }

    axios
      .post(`/threads/?name=${threadName}&desc=${threadDesc}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    onFinish();
  };

  return (
    <Container sx={style} maxWidth="sm">
      <Box sx={{ display: "grid" }}>
        <Typography variant="h3">Create Thread</Typography>

        <Typography className={errMsg ? "errmsg" : "offscreen"} variant="p">
          {errMsg}
        </Typography>

        <TextField
          onChange={onNameChange}
          value={threadName}
          label={"Thread Name"}
          variant="outlined"
          margin="dense"
          helperText={nameErrorText}
          error={nameError}
          required
        />
        <TextField
          onChange={onDescChange}
          value={threadDesc}
          label={"Thread Description"}
          variant="outlined"
          margin="dense"
          helperText={descErrorText}
          error={descError}
          required
        />

        <Button onClick={handleSubmit} variant="contained">
          Create Thread
        </Button>
      </Box>
    </Container>
  );
}

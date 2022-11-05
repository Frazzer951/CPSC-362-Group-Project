import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  p: 4,
  borderRadius: 3,
};

export default function EditThread(props) {
  let { thread, onFinish } = props;
  const [name, setName] = useState(thread.name);
  const [desc, setDesc] = useState(thread.description);
  const [errMsg, setErrMsg] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");
  const [descError, setDescError] = useState(false);
  const [descErrorText, setDescErrorText] = useState("");

  const nameLimit = 128;
  const descLimit = 128;

  useEffect(() => {
    setErrMsg("");
  }, [name, desc]);

  useEffect(() => {
    if (name.length > nameLimit) {
      setNameError(true);
      setNameErrorText(`Exceeds Character Limit of ${nameLimit}`);
    } else {
      setNameError(false);
      setNameErrorText("");
    }
  }, [name]);

  useEffect(() => {
    if (desc.length > descLimit) {
      setDescError(true);
      setDescErrorText(`Exceeds Character Limit of ${descLimit}`);
    } else {
      setDescError(false);
      setDescErrorText("");
    }
  }, [desc]);

  const onNameChange = (e) => setName(e.target.value);
  const onDescChange = (e) => setDesc(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || desc === "") {
      setErrMsg("Missing Name or Description");
      return;
    }

    //await axios
    //  .post("/comments", {
    //    user_id: auth.userID,
    //    post_id: postID,
    //    body: body,
    //  })
    //  .then(function (response) {
    //    console.log(response);
    //  })
    //  .catch(function (error) {
    //    console.log(error);
    //  });

    onFinish();
  };

  return (
    <Container sx={style} maxWidth="sm">
      <Box sx={{ display: "grid" }}>
        <Typography variant="h3">Edit Thread</Typography>

        <Typography className={errMsg ? "errmsg" : "offscreen"} variant="p">
          {errMsg}
        </Typography>

        <TextField
          onChange={onNameChange}
          value={name}
          label={"Thread Name"}
          variant="outlined"
          margin="dense"
          helperText={nameErrorText}
          error={nameError}
          required
        />
        <TextField
          onChange={onDescChange}
          value={desc}
          label={"Thread Description"}
          variant="outlined"
          margin="dense"
          helperText={descErrorText}
          error={descError}
          required
        />

        <Button onClick={handleSubmit} variant="contained">
          Edit Thread
        </Button>
      </Box>
    </Container>
  );
}

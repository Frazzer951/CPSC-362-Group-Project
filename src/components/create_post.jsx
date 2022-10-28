import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";

import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  p: 4,
  borderRadius: 3,
};

export default function CreatePost(props) {
  let { threadID } = props;
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [titleErrorText, setTitleErrorText] = useState("");
  const [bodyError, setBodyError] = useState(false);
  const [bodyErrorText, setBodyErrorText] = useState("");

  const titleLimit = 128;
  const bodyLimit = 1024;


  useEffect(() => {
    setErrMsg("");
  }, [title, body]);

  useEffect(() => {
    if (title.length > titleLimit) {
      setTitleError(true);
      setTitleErrorText(`Exceeds Character Limit of ${titleLimit}`);
    } else {
      setTitleError(false);
      setTitleErrorText("");
    }
  }, [title]);

  useEffect(() => {
    if (body.length > bodyLimit) {
      setBodyError(true);
      setBodyErrorText(`Exceeds Character Limit of ${bodyLimit}`);
    } else {
      setBodyError(false);
      setBodyErrorText("");
    }
  }, [body]);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onBodyChange = (e) => setBody(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || body === "") {
      setErrMsg("Missing Title or Body");
      return;
    }

    axios
      .post(`/posts/${threadID}`, {
        user_id: auth.userID,
        title: title,
        body: body,
      })
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
        <Typography variant="h3">Create Post</Typography>

        <Typography className={errMsg ? "errmsg" : "offscreen"} variant="p">
          {errMsg}
        </Typography>

        <TextField
          onChange={onTitleChange}
          value={title}
          label={"Title"}
          variant="outlined"
          margin="dense"
          helperText={titleErrorText}
          error={titleError}
          required
        />
        <TextField
          onChange={onBodyChange}
          value={body}
          label={"Body"}
          variant="outlined"
          margin="dense"
          rows={6}
          multiline
          helperText={bodyErrorText}
          error={bodyError}
          required
        />

        <Button onClick={handleSubmit} variant="contained">
          Create Post
        </Button>
      </Box>
    </Container>
  );
}

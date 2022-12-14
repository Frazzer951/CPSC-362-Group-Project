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

export default function EditPost(props) {
  let { post, userID, postID, onFinish } = props;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
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

    console.log(body);

    await axios
      .patch(`/posts/edit/title/?user_id=${userID}&post_id=${postID}&title=${title}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    await axios
      .patch(`/posts/edit/body/?user_id=${userID}&post_id=${postID}`, {
        text: body,
      })
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
        <Typography variant="h3">Edit Post</Typography>

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
          Edit Post
        </Button>
      </Box>
    </Container>
  );
}

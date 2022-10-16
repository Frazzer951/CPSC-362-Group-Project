import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

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

  const onTitleChange = (e) => setTitle(e.target.value);
  const onBodyChange = (e) => setBody(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`/posts/${threadID}?user_id=${auth.userID}&title=${title}&body=${body}`)
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

        <TextField onChange={onTitleChange} value={title} label={"Title"} variant="outlined" margin="dense" required />
        <TextField onChange={onBodyChange} value={body} label={"Body"} variant="outlined" margin="dense" required />

        <Button onClick={handleSubmit} variant="contained">
          Create Post
        </Button>
      </Box>
    </Container>
  );
}

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

export default function CreateComment(props) {
  let { postID } = props;
  const { auth } = useContext(AuthContext);
  const [body, setBody] = useState("");

  const onBodyChange = (e) => setBody(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let comment_body = {
      user_id: auth.userID,
      post_id: postID,
      body: body,
    };

    axios
      .post("/comments", comment_body)
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
        <Typography variant="h3">Post Comment</Typography>

        <TextField onChange={onBodyChange} value={body} label={"Body"} variant="outlined" margin="dense" required />

        <Button onClick={handleSubmit} variant="contained">
          Create Thread
        </Button>
      </Box>
    </Container>
  );
}

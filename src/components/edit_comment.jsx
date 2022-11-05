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

export default function EditComment(props) {
  let { comment, onFinish } = props;
  const [body, setBody] = useState(comment.body);
  const [errMsg, setErrMsg] = useState("");
  const [bodyError, setBodyError] = useState(false);
  const [bodyErrorText, setBodyErrorText] = useState("");

  const bodyLimit = 1024;

  useEffect(() => {
    setErrMsg("");
  }, [body]);

  useEffect(() => {
    if (body.length > bodyLimit) {
      setBodyError(true);
      setBodyErrorText(`Exceeds Character Limit of ${bodyLimit}`);
    } else {
      setBodyError(false);
      setBodyErrorText("");
    }
  }, [body]);

  const onBodyChange = (e) => setBody(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (body === "") {
      setErrMsg("Missing Body");
      return;
    }

    onFinish();
  };

  return (
    <Container sx={style} maxWidth="sm">
      <Box sx={{ display: "grid" }}>
        <Typography variant="h3">Edit Comment</Typography>

        <Typography className={errMsg ? "errmsg" : "offscreen"} variant="p">
          {errMsg}
        </Typography>

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
          Edit Comment
        </Button>
      </Box>
    </Container>
  );
}

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

export default function EditAboutMe(props) {
  let { about_me, onFinish } = props;
  const [aboutMe, setAboutMe] = useState(about_me);
  const [errMsg, setErrMsg] = useState("");
  const [aboutMeError, setAboutMeError] = useState(false);
  const [aboutMeErrorText, setAboutMeErrorText] = useState("");

  const aboutMeLimit = 1024;

  useEffect(() => {
    setErrMsg("");
  }, [aboutMe]);

  useEffect(() => {
    if (aboutMe.length > aboutMeLimit) {
      setAboutMeError(true);
      setAboutMeErrorText(`Exceeds Character Limit of ${aboutMeLimit}`);
    } else {
      setAboutMeError(false);
      setAboutMeErrorText("");
    }
  }, [aboutMe]);

  const onAboutMeChange = (e) => setAboutMe(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (aboutMe === "") {
      setErrMsg("Missing Body");
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
        <Typography variant="h3">Edit About Me</Typography>

        <Typography className={errMsg ? "errmsg" : "offscreen"} variant="p">
          {errMsg}
        </Typography>

        <TextField
          onChange={onAboutMeChange}
          value={aboutMe}
          label={"About Me"}
          variant="outlined"
          margin="dense"
          rows={6}
          multiline
          helperText={aboutMeErrorText}
          error={aboutMeError}
          required
        />

        <Button onClick={handleSubmit} variant="contained">
          Edit About Me
        </Button>
      </Box>
    </Container>
  );
}

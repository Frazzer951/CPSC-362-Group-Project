import { Card, CardContent, Container, Divider, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../api/axios";
import AddButton from "../components/add_button";
import Comment from "../components/comment";
import CreateComment from "../components/create_comment";

export default function Post() {
  let { postID } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`/post/${postID}`)
      .then((res) => {
        console.log(res);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/comments/${postID}`)
      .then((res) => {
        console.log(res);
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postID, refresh]);

  const onAddClick = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRefresh(!refresh);
  };

  return (
    <div>
      {post ? (
        <Card sx={{ minWidth: 275, margin: "0.5rem" }}>
          <CardContent>
            <Typography variant="body2">{post.username}</Typography>
            <Typography variant="h3" component="div">
              {post.title}
            </Typography>
            <Typography variant="body1">{post.body}</Typography>
          </CardContent>
        </Card>
      ) : (
        <h2>Loading</h2>
      )}

      <Divider />

      <Container maxWidth="lg">
        {comments ? (
          comments.map((comment) => {
            return <Comment comment={comment} />;
          })
        ) : (
          <h2>Loading</h2>
        )}
      </Container>

      <Modal open={open} onClose={handleClose}>
        <CreateComment postID={postID} />
      </Modal>

      <AddButton onClick={onAddClick} />
    </div>
  );
}

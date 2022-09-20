import { Card, CardContent, Container, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/comment";

import axios from "../api/axios";

export default function Post() {
  let params = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    axios
      .get(`/post/${params.postID}`)
      .then((res) => {
        console.log(res);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/comments/${params.postID}`)
      .then((res) => {
        console.log(res);
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.postID]);

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
    </div>
  );
}

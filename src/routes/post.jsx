import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments, getUsername, getPost } from "../data";
import { Card, CardContent, Container, Divider, Typography } from "@mui/material";
import Comment from "../components/comment";

export default function Post() {
  let params = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    setPost(getPost(params.postID));
    setComments(getComments(params.postID));
  }, [params.postID]);

  return (
    <div>
      {post ? (
        <Card sx={{ minWidth: 275, margin: "0.5rem" }}>
          <CardContent>
            <Typography variant="body2">{getUsername(post.userID)}</Typography>
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

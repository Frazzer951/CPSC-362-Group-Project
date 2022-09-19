import { api } from "../api";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Post(props) {
  let { post } = props;
  const [username, setUsername] = useState("");

  useEffect(() => {
    api
      .get(`/users/${post.user_id}`)
      .then((res) => {
        console.log(res);
        setUsername(res.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [post.user_id]);

  return (
    <Link style={{ textDecoration: "none" }} to={`${post.post_id}`} key={post.post_id}>
      <Card sx={{ minWidth: 275, margin: "0.5rem" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2">by {username}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

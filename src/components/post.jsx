import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Post(props) {
  let { post } = props;

  return (
    <Card sx={{ minWidth: 275, margin: "0.5rem" }}>
      <CardContent>
        <Typography variant="body2">{post.username}</Typography>
        <Typography variant="h3" component="div">
          {post.title}
        </Typography>
        <Typography variant="body1">{post.body}</Typography>
      </CardContent>
    </Card>
  );
}

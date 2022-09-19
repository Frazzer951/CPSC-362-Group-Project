import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { getUsername } from "../data";

export default function Post(props) {
  let { post } = props;

  return (
    <Link style={{ textDecoration: "none" }} to={`${post.post_id}`} key={post.post_id}>
      <Card sx={{ minWidth: 275, margin: "0.5rem" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2">by {getUsername(post.user_id)}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

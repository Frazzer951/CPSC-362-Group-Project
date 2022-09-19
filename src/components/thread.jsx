import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Thread(props) {
  let { thread } = props;

  return (
    <Link style={{ textDecoration: "none" }} to={`/${thread.thread_id}`} key={thread.thread_id}>
      <Card sx={{ minWidth: 275, margin: "0.5rem" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {thread.name}
          </Typography>
          <Typography variant="body2">{thread.description}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

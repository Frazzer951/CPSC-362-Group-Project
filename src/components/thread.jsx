import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

export default function Thread(props) {
  let { thread } = props;

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/${thread.id}`}
      key={thread.id}
    >
      <Card sx={{ minWidth: 275, margin: "1rem" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {thread.name}
          </Typography>
          <Typography variant="body2">{thread.desc}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

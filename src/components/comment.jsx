import { Card, CardContent, Typography } from "@mui/material";

export default function Comment(props) {
  let { comment } = props;

  return (
    <Card sx={{ minWidth: 275, margin: "0.5rem", backgroundColor: "secondary.main" }}>
      <CardContent>
        <Typography variant="body2">{comment.username}</Typography>
        <Typography variant="body1">{comment.body}</Typography>
      </CardContent>
    </Card>
  );
}

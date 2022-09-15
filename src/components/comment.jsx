import { Card, CardContent, Typography } from "@mui/material";
import { getUsername } from "../data";
import { theme } from "../theme";

export default function Comment(props) {
  let { comment } = props;

  return (
    <Card sx={{ minWidth: 275, margin: "0.5rem", backgroundColor: theme.palette.secondary.main }}>
      <CardContent>
        <Typography variant="body2">{getUsername(comment.userID)}</Typography>
        <Typography variant="body1">by {comment.body}</Typography>
      </CardContent>
    </Card>
  );
}

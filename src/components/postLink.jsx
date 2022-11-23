import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Post(props) {
  let { post } = props;

  return (
    <Link style={{ textDecoration: "none" }} to={`${post.post_id}`}>
      <Box sx={{ position: "relative" }}>
        <Paper sx={{ minWidth: 275, margin: "0.5rem" }}>
          <Box sx={{ padding: "1rem" }}>
            <Typography variant="body2">By: {post.username}</Typography>
            <Typography variant="h3" component="div">
              {post.title}
            </Typography>
          </Box>

          <Box sx={{ position: "absolute", bottom: "0.1rem", right: "1rem", display: "flex" }}>
            <Box sx={{ margin: "0.2rem" }}>
              <ThumbUp sx={{ marginRight: "0.1rem" }} fontSize="inherit" color="primary" />
              <Typography variant="body" color="primary">
                {post.likes}
              </Typography>
            </Box>
            <Box sx={{ margin: "0.2rem" }}>
              <ThumbDown sx={{ marginRight: "0.1rem" }} fontSize="inherit" color="primary" />
              <Typography variant="body" color="primary">
                {post.dislikes}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Link>
  );
}

import { Link } from "react-router-dom";

import { AppBar, Avatar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export default function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TITAN FORUMS
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <Link style={{ textDecoration: "none" }} to={`/`} key="threads">
              <Button key="threads" sx={{ my: 2, color: "white", display: "block" }}>
                Threads
              </Button>
            </Link>
          </Box>

          <Avatar sx={{ bgcolor: "#ffffff" }}>
            <AccountCircle color="secondary" />
          </Avatar>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

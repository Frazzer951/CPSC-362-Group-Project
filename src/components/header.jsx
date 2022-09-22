import { AccountCircle } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Container, Toolbar, Typography, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

          <Button onClick={handleOpen}>
            <Avatar sx={{ bgcolor: "#ffffff" }}>
              <AccountCircle color="secondary" />
            </Avatar>
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

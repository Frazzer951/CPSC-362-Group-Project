import { AccountCircle } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Container, Toolbar, Typography, Popover, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState, useContext } from "react";

import AuthContext from "../context/AuthProvider";
import Login from "./login";
import CreateAccount from "./create_account";

export default function Header() {
  const { auth } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState("1");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const open = Boolean(anchorEl);
  const popover_id = open ? "popover" : undefined;

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

          <Button onClick={handleClick}>
            <Avatar sx={{ bgcolor: "#ffffff" }}>
              <AccountCircle color="secondary" />
            </Avatar>
          </Button>

          <Popover
            id={popover_id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {auth.logged_in ? (
              <Box sx={{ width: "100%", typography: "body1", backgroundColor: "white" }}>{JSON.stringify(auth)}</Box>
            ) : (
              <Box sx={{ width: "100%", typography: "body1", backgroundColor: "white" }}>
                <TabContext value={tabValue}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} centered>
                      <Tab label="Login" value="1" />
                      <Tab label="Create Account" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <Login />
                  </TabPanel>
                  <TabPanel value="2">
                    <CreateAccount />
                  </TabPanel>
                </TabContext>
              </Box>
            )}
          </Popover>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

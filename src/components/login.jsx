import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

const LOGIN_URL = "/user/auth";

/// Code inspired tutorial at https://www.youtube.com/watch?v=X3qyxo_UTR4
export default function Login() {
  const { setAuth } = useContext(AuthContext);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const onUserChange = (e) => setUser(e.target.value);
  const onPwdChange = (e) => setPwd(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user === "" || pwd === "") {
      setErrMsg("Missing Username or Password");
      return;
    }

    try {
      const response = await axios.post(LOGIN_URL, {
        username: user,
        password: pwd,
        withCredentials: true,
      });

      const userID = response.data.user_id;
      const admin = response.data.admin;
      setAuth({ logged_in: true, isAdmin: admin, userID });
      localStorage.setItem("userID", userID);
      localStorage.setItem("isAdmin", admin);

      setUser("");
      setPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <Box sx={{ display: "grid" }}>
      <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>

      <TextField
        onChange={onUserChange}
        value={user}
        label={"Username"}
        variant="filled"
        margin="dense"
        autoComplete="username"
        required
      />
      <TextField
        onChange={onPwdChange}
        value={pwd}
        label={"Password"}
        variant="filled"
        type="password"
        margin="dense"
        autoComplete="current-password"
        required
      />

      <Button onClick={handleSubmit} variant="contained">
        Sign In
      </Button>
    </Box>
  );
}

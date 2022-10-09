import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import axios from "../api/axios";

const CREATE_ACCOUNT_URL = "/user/create";

/// Code inspired tutorial at https://www.youtube.com/watch?v=X3qyxo_UTR4
export default function CreateAccount() {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [sucMsg, setSucMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const onUserChange = (e) => setUser(e.target.value);
  const onPwdChange = (e) => setPwd(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(CREATE_ACCOUNT_URL, {
        username: user,
        password: pwd,
        withCredentials: true,
      });

      console.log(response?.data);

      // const userID = response?.data?.userID;
      // const admin = response?.data?.isAdmin;
      // setAuth({ user, logged_in: true, admin, userID });

      setUser("");
      setPwd("");
      setSucMsg("Account Successfully Created");

      console.log(sucMsg);
    } catch (err) {
      setSucMsg("");
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 406) {
        setErrMsg("User already exists");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <Box sx={{ display: "grid" }}>
      <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
      <p className={sucMsg ? "sucmsg" : "offscreen"}>{sucMsg}</p>

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
        autoComplete="new-password"
        required
      />

      <Button onClick={handleSubmit} variant="contained">
        Create Account
      </Button>
    </Box>
  );
}

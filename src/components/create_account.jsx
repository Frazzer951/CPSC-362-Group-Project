import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";
const CREATE_ACCOUNT_URL = "/user/create";

export default function CreateAccount() {
  const { setAuth } = useContext(AuthContext);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

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
    <section>
      <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />

        <button>Create Account</button>
      </form>
    </section>
  );
}
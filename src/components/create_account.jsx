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
    <section>
      <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
      <p className={sucMsg ? "sucmsg" : "offscreen"}>{sucMsg}</p>

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

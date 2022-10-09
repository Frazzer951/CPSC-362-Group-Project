import { Divider, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../api/axios";

export default function User() {
  let params = useParams();
  let [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`/users/${params.userID}`)
      .then((res) => {
        console.log(res);
        let username = res.data.username;
        let about_me = res.data.about_me;
        if (!about_me) {
          about_me = "Write something about yourself!";
        }
        setUser({
          username: username,
          about_me: about_me,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

  return (
    <div>
      {user ? (
        <>
          <Typography variant="h3" sx={{ paddingTop: "1rem" }}>
            {user.username}
          </Typography>

          <Divider />

          <Paper elevation={2}>
            <Typography variant="h6" sx={{ padding: ".1rem" }}>
              {user.about_me}
            </Typography>
          </Paper>
        </>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

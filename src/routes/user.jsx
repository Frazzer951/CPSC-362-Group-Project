import { Box, Divider, Typography, Paper } from "@mui/material";
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
        //setThreads(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setUser({
      username: "Username",
      about_me:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet volutpat consequat mauris. Id cursus metus aliquam eleifend. Vel pharetra vel turpis nunc. Elit eget gravida cum sociis. Quisque sagittis purus sit amet volutpat consequat mauris nunc congue. Nisl suscipit adipiscing bibendum est. Adipiscing at in tellus integer feugiat scelerisque varius. Nisl pretium fusce id velit ut tortor. Sit amet commodo nulla facilisi. Ornare suspendisse sed nisi lacus sed.",
    });
  }, []);

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

import { Container } from "@mui/material";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/header";
import AuthContext from "./context/AuthProvider";
import Post from "./routes/post_route";
import Thread from "./routes/thread_route";
import Threads from "./routes/threads_route";
import User from "./routes/user_route";

export default function App() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    let userID = localStorage.getItem("userID");
    let isAdmin = localStorage.getItem("isAdmin");

    if (userID && isAdmin) {
      setAuth({ logged_in: true, isAdmin, userID });
    }
  }, [setAuth]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Threads />} />
          <Route path="/:threadID" element={<Thread />} />
          <Route path="/:threadID/:postID" element={<Post />} />
          <Route path="/user/:userID" element={<User />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

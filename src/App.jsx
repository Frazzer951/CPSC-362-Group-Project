import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";

import AuthContext from "./context/AuthProvider";
import Header from "./components/header";
import Post from "./routes/post";
import Thread from "./routes/thread";
import Threads from "./routes/threads";
import User from "./routes/user";

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

import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthProvider";

import Header from "./components/header";

import Post from "./routes/post";
import Thread from "./routes/thread";
import Threads from "./routes/threads";

import Login from "./components/login";

export default function App() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      {JSON.stringify(auth)}
      <Login />
    </>
  );
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Threads />} />
          <Route path="/:threadID" element={<Thread />} />
          <Route path="/:threadID/:postID" element={<Post />} />
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

import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header";

import Post from "./routes/post";
import Thread from "./routes/thread";
import Threads from "./routes/threads";
import User from "./routes/user"

export default function App() {
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

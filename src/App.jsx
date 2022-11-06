import { Container } from "@mui/material";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/header";
import AuthContext from "./context/AuthProvider";
import PostPage from "./routes/postPage";
import ThreadPage from "./routes/threadPage";
import ThreadsPage from "./routes/threadsPage";
import UserPage from "./routes/userPage";

export default function App() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    let userID = localStorage.getItem("userID");
    let isAdmin = localStorage.getItem("isAdmin");

    if (userID && isAdmin) {
      setAuth({ logged_in: true, isAdmin: parseInt(isAdmin), userID: parseInt(userID) });
    }
  }, [setAuth]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<ThreadsPage />} />
          <Route path="/:threadID" element={<ThreadPage />} />
          <Route path="/:threadID/:postID" element={<PostPage />} />
          <Route path="/user/:userID" element={<UserPage />} />
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

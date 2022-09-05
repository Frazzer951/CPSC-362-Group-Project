import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/header";

import Thread from "./routes/thread";
import Threads from "./routes/threads";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Threads />} />
        <Route path="/:threadID" element={<Thread />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

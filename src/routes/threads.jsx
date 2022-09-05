import { Link } from "react-router-dom";
import { getThreads } from "../data";

export default function Threads() {
  let threads = getThreads();
  return (
    <div>
      <h2>Threads</h2>
      <nav
        style={{
          border: "solid 1px",
          padding: "1rem",
        }}
      >
        {threads.map((thread) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/${thread.id}`}
            key={thread.id}
          >
            {thread.name} <br />
            {thread.desc}
          </Link>
        ))}
      </nav>
    </div>
  );
}

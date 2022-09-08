import { getThreads } from "../data";
import Link from "@mui/material/Link";

export default function Threads() {
  let threads = getThreads();
  return (
    <div>
      <h2>Threads</h2>
      <nav>
        {threads.map((thread) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            href={`/${thread.id}`}
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

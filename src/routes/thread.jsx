import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPosts, getThread } from "../data";

export default function Thread() {
  let params = useParams();
  const [thread, setThread] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    setThread(getThread(params.threadID));
    setPosts(getPosts(params.threadID));
  }, []);

  return (
    <div>
      {thread ? (
        <>
          <h2>Name: {thread.name}</h2>
          <h3>Desc: {thread.desc}</h3>
        </>
      ) : (
        <h2>Loading</h2>
      )}

      <h3>Posts:</h3>

      {posts ? (
        posts.map((post) => {
          return (
            <div>
              <Link
                style={{ display: "block", margin: "1rem 0" }}
                to={`${post.id}`}
                key={post.id}
              >
                Title: {post.title} <br />
                Body: {post.body}
              </Link>
            </div>
          );
        })
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

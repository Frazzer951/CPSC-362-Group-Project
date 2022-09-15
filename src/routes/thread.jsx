import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import { getPosts, getThread } from "../data";
import Post from "../components/post";

export default function Thread() {
  let params = useParams();
  const [thread, setThread] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    setThread(getThread(params.threadID));
    setPosts(getPosts(params.threadID));
  }, [params.threadID]);

  return (
    <div>
      {thread ? (
        <>
          <Typography variant="h3" sx={{ paddingTop: "1rem" }}>
            {thread.name}
          </Typography>
          <Typography variant="h6" sx={{ padding: ".1rem" }}>
            {thread.desc}
          </Typography>
        </>
      ) : (
        <h2>Loading</h2>
      )}
      <Divider />

      {posts ? (
        posts.map((post) => {
          return <Post post={post} />;
        })
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

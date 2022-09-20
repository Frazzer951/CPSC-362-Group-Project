import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import Post from "../components/post";

export default function Thread() {
  let params = useParams();
  const [thread, setThread] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios
      .get(`/threads/${params.threadID}`)
      .then((res) => {
        console.log(res);
        setThread(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/posts/${params.threadID}`)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.threadID]);

  return (
    <div>
      {thread ? (
        <>
          <Typography variant="h3" sx={{ paddingTop: "1rem" }}>
            {thread.name}
          </Typography>
          <Typography variant="h6" sx={{ padding: ".1rem" }}>
            {thread.description}
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

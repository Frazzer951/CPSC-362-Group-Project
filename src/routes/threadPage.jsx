import { Divider, Modal, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../api/axios";
import AddButton from "../components/add_button";
import CreatePost from "../components/create_post";
import Post from "../components/postLink";
import AuthContext from "../context/AuthProvider";

export default function ThreadPage() {
  let { threadID } = useParams();
  const [thread, setThread] = useState();
  const [posts, setPosts] = useState();
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [display, setDisplay] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.logged_in) {
      console.log("Setting to true");
      setDisplay(true);
    } else {
      console.log("Setting to false");
      setDisplay(false);
    }
  }, [auth]);

  useEffect(() => {
    axios
      .get(`/threads/${threadID}`)
      .then((res) => {
        console.log(res);
        setThread(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/posts/${threadID}`)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [threadID, refresh]);

  const onAddClick = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRefresh(!refresh);
  };

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
          return <Post post={post} key={`post-${post.post_id}-${post.title}`} />;
        })
      ) : (
        <h2>Loading</h2>
      )}

      {display ? (
        <>
          <Modal open={open} onClose={handleClose}>
            <CreatePost threadID={threadID} onFinish={handleClose} />
          </Modal>

          <AddButton onClick={onAddClick} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

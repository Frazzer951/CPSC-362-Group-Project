import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments, getPost, getUsername } from "../data";

export default function Post() {
  let params = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    setPost(getPost(params.postID));
    setComments(getComments(params.postID));
  }, [params.postID]);

  return (
    <div>
      {post ? (
        <>
          <h2>Title: {post.title}</h2>
          <h3>Body: {post.body}</h3>
        </>
      ) : (
        <h2>Loading</h2>
      )}
      {comments ? (
        comments.map((comment) => {
          return (
            <div>
              {getUsername(comment.userID)}: {comment.body}
            </div>
          );
        })
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

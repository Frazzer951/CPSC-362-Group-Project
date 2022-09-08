import { threads, posts, comments } from "./fakedata";

export function getThreads() {
  return threads;
}

export function getThread(id) {
  return threads.find((thread) => thread.id === parseInt(id));
}

export function getPosts(id) {
  return posts.filter((post) => post.threadID === parseInt(id));
}

export function getPost(id) {
  return posts.find((post) => post.id === parseInt(id));
}

export function getComments(id) {
  return comments.filter((comment) => comment.postID === parseInt(id));
}

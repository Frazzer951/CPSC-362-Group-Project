import { threads, posts } from "./fakedata";

export function getThreads() {
  return threads;
}

export function getThread(id) {
  return threads.find((thread) => thread.id == id);
}

export function getPosts(id) {
  return posts.filter((post) => post.threadID == id);
}

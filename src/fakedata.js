export let threads = [
  {
    id: 0,
    name: "Introductions",
    desc: "Introduce yourself",
  },
  {
    id: 1,
    name: "General",
    desc: "All Generic Posts",
  },
  {
    id: 2,
    name: "Help",
    desc: "Need help? Post here",
  },
  {
    id: 3,
    name: "Homework",
    desc: "Homework related posts",
  },
];

export let posts = [
  {
    id: 0,
    threadID: 0,
    userID: 0,
    title: "Title 0.1",
    body: "Body 0.1",
  },
  {
    id: 1,
    threadID: 0,
    userID: 0,
    title: "Title 0.2",
    body: "Body 0.2",
  },
  {
    id: 2,
    threadID: 1,
    userID: 0,
    title: "Title 1.1",
    body: "Body 1.1",
  },
  {
    id: 3,
    threadID: 1,
    userID: 0,
    title: "Title 1.2",
    body: "Body 1.2",
  },
  {
    id: 4,
    threadID: 2,
    userID: 0,
    title: "Title 2.1",
    body: "Body 2.1",
  },
  {
    id: 5,
    threadID: 2,
    userID: 0,
    title: "Title 2.2",
    body: "Body 2.2",
  },
  {
    id: 6,
    threadID: 3,
    userID: 0,
    title: "Title 3.1",
    body: "Body 3.1",
  },
  {
    id: 7,
    threadID: 3,
    userID: 0,
    title: "Title 3.2",
    body: "Body 3.2",
  },
];

export let comments = [
  {
    id: 0,
    postID: 0,
    userID: 0,
    body: "A really cool comment",
  },
  {
    id: 1,
    postID: 0,
    userID: 1,
    body: "Another really cool comment",
  },
  {
    id: 2,
    postID: 0,
    userID: 0,
    body: "Boo",
  },
  {
    id: 2,
    postID: 0,
    userID: 2,
    body: "Really cool post",
  },
];

export let users = [
  {
    id: 0,
    username: "Frazzer",
    about_me: "I am me",
    admin: true,
  },
  {
    id: 1,
    username: "Dude_1",
    about_me: "I am Dude_1",
    admin: false,
  },
  {
    id: 2,
    username: "Dude_2",
    about_me: "I am Dude_2",
    admin: false,
  },
];

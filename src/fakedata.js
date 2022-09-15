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
    title: "Hi Im Frazzer",
    body: "Hello, my name is Frazzer. I am a student at CSUF and am a CPSC Major.",
  },
  {
    id: 1,
    threadID: 0,
    userID: 1,
    title: "Hi Im Dude_1",
    body: "Im not real",
  },
  {
    id: 2,
    threadID: 1,
    userID: 0,
    title: "Lorem Ipsum",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras sed felis eget velit aliquet sagittis id consectetur. Risus sed vulputate odio ut enim blandit volutpat. Habitasse platea dictumst quisque sagittis purus sit amet volutpat. Id cursus metus aliquam eleifend mi in nulla posuere. Scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis. Nisi lacus sed viverra tellus in hac habitasse. Sed adipiscing diam donec adipiscing tristique. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Eget aliquet nibh praesent tristique magna sit amet. Fusce id velit ut tortor. Eu nisl nunc mi ipsum faucibus vitae. Adipiscing vitae proin sagittis nisl rhoncus. Lacus vel facilisis volutpat est velit egestas dui id. Vitae turpis massa sed elementum tempus egestas. A iaculis at erat pellentesque adipiscing commodo elit at. Faucibus interdum posuere lorem ipsum dolor sit.

    Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum. Sed cras ornare arcu dui vivamus arcu. Turpis in eu mi bibendum neque. Sit amet est placerat in egestas erat. Imperdiet proin fermentum leo vel orci. Venenatis urna cursus eget nunc scelerisque viverra. Tristique risus nec feugiat in fermentum posuere urna nec. Elit ullamcorper dignissim cras tincidunt lobortis. Sed enim ut sem viverra aliquet. Ut eu sem integer vitae justo eget magna fermentum iaculis. Leo in vitae turpis massa sed elementum tempus egestas. Egestas sed tempus urna et. Justo donec enim diam vulputate ut pharetra sit amet. Amet nisl purus in mollis nunc.

    Libero volutpat sed cras ornare arcu dui vivamus arcu felis. Aliquet lectus proin nibh nisl condimentum id venenatis. Tincidunt nunc pulvinar sapien et ligula. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Faucibus nisl tincidunt eget nullam. Felis bibendum ut tristique et egestas quis. Elementum pulvinar etiam non quam lacus suspendisse. Quis auctor elit sed vulputate mi sit amet mauris commodo. Mattis enim ut tellus elementum sagittis vitae et leo duis.

    Nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Viverra suspendisse potenti nullam ac tortor. Luctus accumsan tortor posuere ac ut. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet non. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Porta nibh venenatis cras sed felis eget velit aliquet. Odio tempor orci dapibus ultrices in iaculis nunc. Nullam eget felis eget nunc lobortis. Diam in arcu cursus euismod quis viverra nibh cras. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Id aliquet lectus proin nibh nisl. Quis varius quam quisque id. Risus in hendrerit gravida rutrum quisque non tellus orci ac. Vitae congue mauris rhoncus aenean vel elit scelerisque. Ut diam quam nulla porttitor massa id neque aliquam. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. A erat nam at lectus urna duis convallis convallis.

    Neque volutpat ac tincidunt vitae semper quis lectus nulla. Ac ut consequat semper viverra nam libero. Sit amet venenatis urna cursus eget nunc scelerisque. Eget lorem dolor sed viverra ipsum nunc aliquet. Ac auctor augue mauris augue neque gravida. Consectetur purus ut faucibus pulvinar. Ut sem nulla pharetra diam. Lectus quam id leo in vitae turpis massa. Massa id neque aliquam vestibulum. Quam lacus suspendisse faucibus interdum posuere. Curabitur gravida arcu ac tortor dignissim convallis aenean et. Sed libero enim sed faucibus turpis. Sed blandit libero volutpat sed. Tellus rutrum tellus pellentesque eu tincidunt tortor. Nam aliquam sem et tortor.`,
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
    id: 3,
    postID: 0,
    userID: 2,
    body: "Really cool post",
  },
  {
    id: 4,
    postID: 6,
    userID: 1,
    body: "This is a comment",
  },
];

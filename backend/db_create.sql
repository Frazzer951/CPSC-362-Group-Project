
CREATE TABLE Users (
    user_id INT NOT NULL,
    username VARCHAR(32) NOT NULL
    password VARCHAR(32) NOT NULL,
    about_me VARCHAR(1024),
    admin BOOL,
    PRIMARY KEY (user_id)
);

CREATE TABLE Threads (
    thread_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(128),
    description VARCHAR(128)
);

CREATE TABLE Posts(
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    thread_id INT NOT NULL,
    title VARCHAR(128),
    body VARCHAR(1024),
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (thread_id) REFERENCES Threads(thread_id)
);

CREATE TABLE Comments(
    comment_id INT NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    body VARCHAR(1024),
    PRIMARY KEY (comment_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

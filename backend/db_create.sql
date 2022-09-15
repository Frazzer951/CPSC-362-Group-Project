
CREATE TABLE Users (
    user_id INT NOT NULL,
    password VARCHAR(20) NOT NULL,
    about_me VARCHAR(30),
    admin BOOL,
    PRIMARY KEY (user_id)
);

CREATE TABLE Threads (
    thread_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30),
    description VARCHAR(50)
);

CREATE TABLE Posts(
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    thread_id INT NOT NULL,
    title VARCHAR(30),
    body VARCHAR(50),
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (thread_id) REFERENCES Threads(thread_id)
);

CREATE TABLE Comments(
    comment_id INT NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    body VARCHAR(50),
    PRIMARY KEY (comment_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

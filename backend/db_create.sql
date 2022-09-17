-- Active: 1662318246144@@127.0.0.1@3306

CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(20) NOT NULL,
    about_me VARCHAR(30),
    admin BOOL
);
INSERT INTO Users(username, password, admin) VALUES("faker10", "12345", 1);

CREATE TABLE Threads (
    thread_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30),
    description VARCHAR(50)
);

CREATE TABLE Posts(
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INT NOT NULL,
    thread_id INT NOT NULL,
    title VARCHAR(30),
    body VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (thread_id) REFERENCES Threads(thread_id)
);

CREATE TABLE Comments(
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    body VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);
INSERT INTO Comments(user_id, post_id, body) VALUES(1, 1, "I like spamming");



DROP TABLE Users;
DROP TABLE Threads;
DROP TABLE Posts;
DROP TABLE Comments;

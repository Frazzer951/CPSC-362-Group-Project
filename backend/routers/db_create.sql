-- Active: 1667672797781@@127.0.0.1@3306

PRAGMA foreign_keys;
PRAGMA foreign_keys = ON;
PRAGMA foreign_keys;

PRAGMA user_version;

CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(32) NOT NULL,
    about_me VARCHAR(1024),
    admin BOOL
);


INSERT INTO Users(username, password, admin) VALUES("faker10", "12345", 1);

CREATE TABLE Threads (
    thread_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(128),
    description VARCHAR(128)
);
INSERT INTO Threads(name, description) VALUES("Thread Name", "this is my thread");

CREATE TABLE Posts(
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    thread_id INTEGER NOT NULL,
    title VARCHAR(128),
    body VARCHAR(1024),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_thread_id FOREIGN KEY (thread_id) REFERENCES Threads(thread_id) ON DELETE CASCADE
);
INSERT INTO Posts(user_id, thread_id, title, body) VALUES(1, 1, "A Title", "this is a cool post");


CREATE TABLE Comments(
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    body VARCHAR(1024),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES Posts(post_id)  ON DELETE CASCADE
);
INSERT INTO Comments(user_id, post_id, body) VALUES(1, 3, "I like spamming");




DROP TABLE Users;
DROP TABLE Threads;
DROP TABLE Posts;
DROP TABLE Comments;


SELECT * FROM Users;

SELECT * FROM Threads;

SELECT * FROM Posts;

SELECT * FROM Comments;

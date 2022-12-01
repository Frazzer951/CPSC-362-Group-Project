-- Active: 1667672797781@@127.0.0.1@3306
CREATE TABLE
    Users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(32) NOT NULL UNIQUE,
        password VARCHAR(32) NOT NULL,
        about_me VARCHAR(1024),
        admin BOOL
    );

CREATE TABLE
    Threads (
        thread_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(128),
        description VARCHAR(128)
    );

CREATE TABLE
    Posts(
        post_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        thread_id INTEGER NOT NULL,
        title VARCHAR(128),
        body VARCHAR(1024),
        CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
        CONSTRAINT fk_thread_id FOREIGN KEY (thread_id) REFERENCES Threads(thread_id) ON DELETE CASCADE
    );

CREATE TABLE
    Comments(
        comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        body VARCHAR(1024),
        CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
        CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE
    );

CREATE TABLE
        LIKES(
            user_id INTEGER NOT NULL,
            post_id INTEGER NOT NULL,
            like_state BOOL,
            CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
            CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE,
            CONSTRAINT like_id PRIMARY KEY (user_id, post_id)
        );

# Users
INSERT INTO
    Users(username, password, admin)
VALUES ("frazzer", "frazzer", 1);

INSERT INTO
    Users(username, password, admin)
VALUES ("faker10", "12345", 0);

# Threads
INSERT INTO
    Threads(name, description)
VALUES (
        "Introductions",
        "Introduce yourself"
    );

INSERT INTO
    Threads(name, description)
VALUES (
        "General",
        "All General Posts"
    );

# Posts
INSERT INTO
    Posts(user_id, thread_id, title, body)
VALUES (
        1,
        1,
        "A Title",
        "this is a cool post"
    );

# Comments
INSERT INTO
    Comments(user_id, post_id, body)
VALUES (2, 1, "I like spamming");
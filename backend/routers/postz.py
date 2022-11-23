import sqlite3

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from utils import Text, row_to_dict

router = APIRouter()

"""https://ubiq.co/database-blog/how-to-get-multiple-counts-with-single-query-in-mysql/
https://callihandata.com/2022/05/02/multiple-counts-in-one-query/
"""


@router.get("/posts/{thread_id}", tags=["posts"])
async def retrieve_posts_in_thread(thread_id: int):
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()  # cur is cursor
    sql_query = f"""SELECT U.username, P.post_id, P.user_id, P.title FROM
                    Posts P, Users U WHERE thread_id = {thread_id}
                    AND P.user_id = U.user_id"""
    sq = cur.execute(sql_query)
    # sq is a cursor resulting from the query made
    looking_for = sq.fetchall()
    for post in looking_for:
        sql_query = """SELECT COUNT(CASE WHEN like_state = 1 THEN 1 END) AS likes,
                              COUNT(CASE WHEN like_state = 0 THEN 1 END) AS dislikes
                              FROM LIKES WHERE post_id = ?"""
        # Get the list of tuples generated form the query

        sq = cur.execute(sql_query, [post["post_id"]])
        lds = sq.fetchone()
        post.update(lds)
        # Combine the dictionaries so they include the likes and dislikes of each post
    con.close()
    return looking_for


@router.get("/post/{post_id}", tags=["posts"])
async def retrieve_specified_post(post_id: int):
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()  # cur is cursor
    sql_query = f"""SELECT P.user_id, username, title, body
                    FROM Posts P, Users U
                    WHERE P.post_id = {post_id} and U.user_id = P.user_id"""
    sq = cur.execute(sql_query)
    # sq is a cursor resulting from the query made
    looking_for = sq.fetchone()
    sql_query = """SELECT COUNT(CASE WHEN like_state = 1 THEN 1 END) AS likes,
                              COUNT(CASE WHEN like_state = 0 THEN 1 END) AS dislikes
                              FROM LIKES WHERE post_id = ?"""
    # Get the list of tuples generated form the query

    sq = cur.execute(sql_query, [post_id])
    lds = sq.fetchone()
    looking_for.update(lds)
    # Combine the dictionaries so they include the likes and dislikes of each post
    # Get the list of tuples generated from the query
    con.close()
    return looking_for


class Post(BaseModel):
    user_id: int
    title: str
    body: str


@router.post("/posts/{thread_id}", tags=["posts"])
async def create_post_in_thread(thread_id: int, post: Post):
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    sql_query = f"SELECT user_id FROM Users WHERE user_id = {post.user_id}"
    sq = cur.execute(sql_query)
    looking_for = sq.fetchone()
    if not looking_for:
        con.close()
        raise HTTPException(status_code=404, detail="User not found")
    try:
        sql_query = "INSERT INTO Posts(thread_id, user_id, title, body) VALUES(?, ?, ?, ?)"
        cur.execute(sql_query, [thread_id, post.user_id, post.title, post.body])
    except:
        con.close()
        raise HTTPException(status_code=409, detail="Conflict")
    con.commit()
    con.close()
    return {"SUCCESS": True}


@router.patch("/posts/edit/body/", tags=["posts"])
async def edit_post_body(user_id: int, post_id: int, body: Text):
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    sql_query = f"SELECT user_id FROM Users WHERE user_id = {user_id}"
    sq = cur.execute(sql_query)
    looking_for = sq.fetchone()
    if not looking_for:
        con.close()
        raise HTTPException(status_code=404, detail="User not found")
    user_id = looking_for["user_id"]
    # print(looking_for)

    sql_query = f"""UPDATE Posts
                    SET body = '{body.text}'
                    WHERE user_id = {user_id} AND
                        post_id = {post_id}"""
    try:
        cur.execute(sql_query)
    except:
        con.close()
        raise HTTPException(status_code=409, detail="Conflict")
    con.commit()
    con.close()
    return {"SUCCESS": True}


@router.patch("/posts/edit/title/", tags=["posts"])
async def edit_post_title(user_id: int, post_id: int, title: str):
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    sql_query = f"SELECT user_id FROM Users WHERE user_id = {user_id}"
    sq = cur.execute(sql_query)
    looking_for = sq.fetchone()
    if not looking_for:
        con.close()
        raise HTTPException(status_code=404, detail="User not found")
    user_id = looking_for["user_id"]
    sql_query = f"""UPDATE Posts
                    SET title = '{title}'
                    WHERE user_id = {user_id} AND
                        post_id = {post_id}"""
    try:
        cur.execute(sql_query)
    except:
        con.close()
        raise HTTPException(status_code=409, detail="Conflict")
    con.commit()
    con.close()
    return {"SUCCESS": True}


@router.delete("/posts/", tags=["posts"])
async def delete_post(user_id: int, post_id: int):
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    sql_query = f"SELECT user_id FROM Users WHERE user_id = {user_id}"
    sq = cur.execute(sql_query)
    looking_for = sq.fetchone()
    if not looking_for:
        raise HTTPException(status_code=404, detail="User not found")
    user_id = looking_for["user_id"]
    sql_query = f"""DELETE FROM Posts
                    WHERE user_id = {user_id} AND
                        post_id = {post_id}"""
    cur.execute(sql_query)
    con.commit()
    con.close()
    return {"SUCCESS": True}


@router.get("/posts/likes/", tags=["posts"])
async def has_made_rating(user_id: int, post_id: int):
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    sql_query = f"SELECT user_id FROM Users WHERE user_id = {user_id}"
    sq = cur.execute(sql_query)
    looking_for = sq.fetchone()
    if not looking_for:
        raise HTTPException(status_code=404, detail="User not found")
    sql_query = f"SELECT user_id, post_id, like_state FROM LIKES WHERE user_id = ? AND post_ID = ?"
    sq = cur.execute(sql_query, [user_id, post_id])
    looking_for = sq.fetchall()
    return looking_for


@router.post("/posts/likes/", tags=["posts"])
async def like_or_dislike_post(user_id: int, post_id: int, like_state: bool):
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    sql_query = f"SELECT user_id FROM Users WHERE user_id = {user_id}"
    sq = cur.execute(sql_query)
    looking_for = sq.fetchone()
    if not looking_for:
        raise HTTPException(status_code=404, detail="User not found")
    sql_query = f"SELECT user_id, post_id, like_state FROM LIKES WHERE user_id = ? AND post_ID = ?"
    sq = cur.execute(sql_query, [user_id, post_id])
    looking_for = sq.fetchall()
    if not looking_for:
        try:
            sql_query = "INSERT INTO Likes VALUES(?, ?, ?)"
            cur.execute(sql_query, [user_id, post_id, like_state])
        except:
            con.close()
            raise HTTPException(status_code=409, detail="Conflict")
    else:
        try:
            sql_query = "UPDATE LIKES SET like_state = ? WHERE user_id = ? AND post_id = ?"
            cur.execute(sql_query, [like_state, user_id, post_id])
        except:
            con.close()
            raise
    con.commit()
    con.close()
    return {"SUCCESS": True}


@router.delete("/posts/likes/", tags=["posts"])
async def unlike_or_undislike(user_id: int, post_id: int):
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    sql_query = f"SELECT user_id FROM Users WHERE user_id = {user_id}"
    sq = cur.execute(sql_query)
    looking_for = sq.fetchone()
    if not looking_for:
        raise HTTPException(status_code=404, detail="User not found")
    user_id = looking_for["user_id"]
    sql_query = f"""DELETE FROM Likes
                    WHERE user_id = {user_id} AND
                        post_id = {post_id}"""
    cur.execute(sql_query)
    con.commit()
    con.close()
    return {"SUCCESS": True}

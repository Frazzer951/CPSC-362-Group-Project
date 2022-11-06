import sqlite3

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from utils import row_to_dict, Text

router = APIRouter()


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
    # Get the list of tuples generated form the query
    con.close()
    return looking_for


@router.get("/post/{post_id}", tags=["posts"])
async def retrieve_specified_post(post_id: int):
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()  # cur is cursor
    sql_query = f"""SELECT username, title, body
                    FROM Posts P, Users U
                    WHERE P.post_id = {post_id} and U.user_id = P.user_id"""
    sq = cur.execute(sql_query)
    # sq is a cursor resulting from the query made
    looking_for = sq.fetchone()
    # Get the list of tuples generated from the query
    con.close()
    return looking_for


class Post(BaseModel):
    user_id: int
    title: str
    body: str


@router.post("/posts/{thread_id}", tags=["posts"])
async def create_post_in_thread(thread_id: int, post: Post):
    """TODO DOES NOT CHECK IF USER EXISTS"""
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
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

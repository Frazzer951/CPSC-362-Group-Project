import sqlite3

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from utils import row_to_dict

router = APIRouter()


@router.get("/posts/{thread_id}", tags=["posts"])
async def retrieve_posts_in_thread(thread_id: int):
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
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
    con = sqlite3.connect("project.db")
    cur = con.cursor()
    """NEED TO CHECK IF USER EXISTS"""
    sql_query = "INSERT INTO Posts(thread_id, user_id, title, body) VALUES(?, ?, ?, ?)"
    cur.execute(sql_query, [thread_id, post.user_id, post.title, post.body])
    con.commit()
    con.close()
    return {"SUCCESS": True}

@router.patch("/posts/edit/body/", tags=["posts"])
async def edit_post_body(username: str, body: str, post_id: int, thread_id: int):
    con = sqlite3.connect("project.db")
    # ncon.row_factory = row_to_dict
    cur = con.cursor()
    try:
        sql_query = f"SELECT user_id FROM Users WHERE username = '{username}'"
        sq = cur.execute(sql_query)
    except:
        raise HTTPException(status_code=404, detail="User not found")   
    looking_for = sq.fetchone()
    user_id = looking_for[0]
    # print(looking_for)
    sql_query = f"""UPDATE Posts 
                    SET body = '{body}' 
                    WHERE user_id = {user_id} AND 
                          post_id = {post_id} AND
                          thread_id = {thread_id}"""
    sq = cur.execute(sql_query)
    con.commit()
    con.close()
    return {"SUCCESS": True}

@router.patch("/posts/edit/title/", tags=["posts"])
async def edit_post_title(username: str, title: str, post_id: int, thread_id: int):
    con = sqlite3.connect("project.db")
    # ncon.row_factory = row_to_dict
    cur = con.cursor()
    try:
        sql_query = f"SELECT user_id FROM Users WHERE username = '{username}'"
        sq = cur.execute(sql_query)
    except:
        raise HTTPException(status_code=404, detail="User not found")
    looking_for = sq.fetchone()
    user_id = looking_for[0]
    sql_query = f"""UPDATE Posts 
                    SET title = '{title}' 
                    WHERE user_id = {user_id} AND 
                          post_id = {post_id} AND
                          thread_id = {thread_id}"""
    cur.execute(sql_query)
    con.commit()
    con.close()
    return {"SUCCESS": True}

@router.delete("/posts/", tags=["posts"])
async def delete_post(username: str, post_id: int):
    con = sqlite3.connect("project.db")
    # ncon.row_factory = row_to_dict
    cur = con.cursor()
    
    sql_query = f"SELECT user_id FROM Users WHERE username = '{username}'"
    sq = cur.execute(sql_query)
    looking_for = sq.fetchone()
    if not looking_for:
        raise HTTPException(status_code=404, detail="User not found")
    user_id = looking_for[0]
    sql_query = f"""DELETE FROM Posts 
                    WHERE user_id = {user_id} AND 
                        post_id = {post_id}"""
    cur.execute(sql_query)
    con.commit()
    con.close()
    return {"SUCCESS": True}
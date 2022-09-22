from concurrent.futures import thread
from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from utils import row_to_dict
import sqlite3

router = APIRouter()


@router.get("/posts/{thread_id}")
async def retrieve_posts_in_thread(thread_id: int):
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    cur = con.cursor()  # cur is cursor
    sq = cur.execute(f"SELECT * FROM Posts WHERE thread_id = {thread_id}")
    # sq is a cursor resulting from the query made
    looking_for = sq.fetchall()
    # Get the list of tuples generated form the query
    con.close()
    return looking_for


@router.get("/post/{post_id}")
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


@router.post("/posts/{thread_id}")
async def create_post_in_thread(thread_id: int, user_id: int, title: str, body: str):
    # We can use pydantic classes instead of so many arguments
    # Something we can do later
    con = sqlite3.connect("project.db")
    cur = con.cursor()
    sql_query = "INSERT INTO Posts(thread_id, user_id, title, body) VALUES(?, ?, ?, ?)"
    cur.execute(sql_query, [thread_id, user_id, title, body])
    con.commit()
    con.close()
    return {"SUCCESS": True}
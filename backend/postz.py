from concurrent.futures import thread
from fastapi import FastAPI, Depends, HTTPException, status
import sqlite3
app = FastAPI()

@app.get("/posts/{thread_id}")
async def retrieve_posts_in_thread(thread_id: int):
    con = sqlite3.connect("project.db") # con is connection
    cur = con.cursor() # cur is cursor
    sq = cur.execute("SELECT * FROM Posts WHERE thread_id = ?",  [thread_id]) 
    #sq is a cursor resulting from the query made
    looking_for = sq.fetchall()
    # Get the list of tuples generated form the query
    con.close()
    return {"posts": looking_for}

@app.get("/posts/{post_id}")
async def retrieve_specified_post(post_id: int):
    con = sqlite3.connect("project.db") # con is connection
    cur = con.cursor() # cur is cursor
    sql_query = """SELECT username, name, title, body FROM Posts
                    LEFT JOIN Users on Posts.user_id = Users.user_id
                    LEFT JOIN Threads on Posts.thread_id = Threads.thread_id
                    WHERE post_id = ?"""
    sq = cur.execute(sql_query, [post_id])
    #sq is a cursor resulting from the query made
    looking_for = sq.fetchone()
    # Get the list of tuples generated from the query
    con.close()
    return {"username": looking_for[0], "name": looking_for[1], "title": looking_for[2], "body": looking_for[3]}

@app.post("/posts/{thread_id}")
async def create_post_in_thread(thread_id: int, username: str, title: str, body: str):
    # We can use pydantic classes instead of so many arguments
    # Something we can do later
    con = sqlite3.connect("project.db")
    cur = con.cursor()
    sql_query = "SELECT user_id FROM Users WHERE username = ?"
    sq = cur.execute(sql_query, [username])
    looking_for = sq.fetchall()
    if not looking_for:
        raise HTTPException(
            status_code=status.HTTP_404_BAD_REQUEST, detail="User does not exist"
        )
    user_id = looking_for[0][0]
    sql_query = "INSERT INTO Posts(user_id, thread_id, title, body) VALUES(?, ?, ?, ?)"
    cur.execute(sql_query, [thread_id, user_id, title, body])
    con.commit()
    con.close()
    return {"SUCCESS": True}
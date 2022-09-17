from concurrent.futures import thread
from fastapi import FastAPI, Depends, HTTPException, status
import sqlite3
app = FastAPI()

@app.get("/comments/{post_id}")
async def retrieve_comments_from_post(post_id: int):
    con = sqlite3.connect("project.db") # con is connection
    cur = con.cursor() # cur is cursor
    sql_query = """SELECT username, title, Posts.body, Comments.body FROM Comments 
                    LEFT JOIN Posts on Comments.post_id = Posts.post_id
                    LEFT JOIN Users on Comments.user_id = Users.user_id
                    WHERE Posts.post_id = ?"""
    sq = cur.execute(sql_query, [post_id])
    #sq is a cursor resulting from the query made
    looking_for = sq.fetchall()
    # Get the list of tuples generated from the query
    all_comments = {}
    for count, tpl in enumerate(looking_for):
        all_comments[f"comment{count + 1}"] = {"username": tpl[0], "title": tpl[1], "post_body": tpl[2], "comment_body": tpl[3]}
    con.close()
    return all_comments
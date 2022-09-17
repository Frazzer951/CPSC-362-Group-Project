from concurrent.futures import thread
from fastapi import FastAPI, Depends, HTTPException, status
import sqlite3
app = FastAPI()

@app.get("/users/{user_id}")
async def retrieve_specified_user(user_id: int):
    con = sqlite3.connect("project.db") # con is connection
    cur = con.cursor() # cur is cursor
    sql_query = "SELECT username FROM Users WHERE user_id = ?"
    sq = cur.execute(sql_query, [user_id])
    #sq is a cursor resulting from the query made
    looking_for = sq.fetchone()
    # Get the list of tuples generated from the query
    con.close()
    return {"username": looking_for[0]}
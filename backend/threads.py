from concurrent.futures import thread
from fastapi import FastAPI, Depends, HTTPException, status
import sqlite3
app = FastAPI()


@app.get("/threads/")
async def retrieve_all_threads():
    con = sqlite3.connect("project.db") # con is connection
    cur = con.cursor() # cur is cursor
    sq = cur.execute("SELECT * FROM Threads") 
    #sq is a cursor resulting from the query made
    looking_for = sq.fetchall()
    # Get the list of tuples generated from the query
    con.close()
    return {"threads": looking_for}

@app.get("/threads/{thread_id}")
async def retrieve_specified_thread(thread_id: int):
    con = sqlite3.connect("project.db") # con is connection
    cur = con.cursor() # cur is cursor
    sql_query = "SELECT name, description FROM Threads WHERE thread_id = ?"
    sq = cur.execute(sql_query, [thread_id])
    #sq is a cursor resulting from the query made
    looking_for = sq.fetchone()
    # Get the list of tuples generated from the query
    con.close()
    return {"name": looking_for[0], "description": looking_for[1]}

@app.post("/threads/")
async def create_thread(name: str, desc: str):
    con = sqlite3.connect("project.db")
    cur = con.cursor()
    cur.execute("INSERT INTO Threads(name, description) VALUES(?, ?)", [name, desc])
    con.commit()
    con.close()
    return {"SUCCESS": True}
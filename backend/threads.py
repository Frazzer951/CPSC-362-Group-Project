from concurrent.futures import thread
from fastapi import FastAPI, Depends, HTTPException, status
import sqlite3
app = FastAPI()


@app.get("/")
async def hw():
    return {"message": "Hello World"}


@app.post("/threads/{thread_id}")
async def create_thread(thread_id: int):
    con = sqlite3.connect("project.db")
    db = con.cursor()
    db.execute("INSERT INTO Threads VALUES(?, ?, ?)", [thread_id, "Fill in name", "Fill in Description"])
    con.commit()
    con.close()
    return {"message": thread_id, "name": "Fill in name", "description": "Fill in Description"}
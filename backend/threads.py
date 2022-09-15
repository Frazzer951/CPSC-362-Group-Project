from concurrent.futures import thread
from fastapi import FastAPI, Depends, HTTPException, status
import sqlite3
app = FastAPI()


@app.get("/")
async def hw():
    return {"message": "Hello World"}


@app.post("/threads/")
async def create_thread(name: str, desc: str):
    con = sqlite3.connect("project.db")
    db = con.cursor()
    db.execute("INSERT INTO Threads(name, description) VALUES(?, ?)", [name, desc])
    con.commit()
    con.close()
    return {"SUCCESS": True}
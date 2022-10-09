import sqlite3

from fastapi import APIRouter
from utils import row_to_dict

router = APIRouter()


@router.get("/threads/", tags=["threads"])
async def retrieve_all_threads():
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    cur = con.cursor()  # cur is cursor
    sq = cur.execute("SELECT thread_id, name, description FROM Threads")
    # sq is a cursor resulting from the query made
    looking_for = sq.fetchall()
    # Get the list of tuples generated from the query
    con.close()
    return looking_for


@router.get("/threads/{thread_id}", tags=["threads"])
async def retrieve_specified_thread(thread_id: int):
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    cur = con.cursor()  # cur is cursor
    sql_query = f"SELECT * FROM Threads WHERE thread_id={thread_id}"
    sq = cur.execute(sql_query)
    # sq is a cursor resulting from the query made
    looking_for = sq.fetchone()
    # Get the list of tuples generated from the query
    con.close()
    return looking_for


@router.post("/threads/", tags=["threads"])
async def create_thread(name: str, desc: str):
    con = sqlite3.connect("project.db")
    cur = con.cursor()
    cur.execute("INSERT INTO Threads(name, description) VALUES(?, ?)", [name, desc])
    con.commit()
    con.close()
    return {"SUCCESS": True}

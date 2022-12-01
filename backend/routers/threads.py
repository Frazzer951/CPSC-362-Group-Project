import sqlite3

from fastapi import APIRouter, HTTPException

from utils import row_to_dict

router = APIRouter()


@router.get("/threads/", tags=["threads"])
async def retrieve_all_threads():
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()  # cur is cursor
    sq = cur.execute("SELECT thread_id, name, description FROM Threads")
    # sq is a cursor resulting from the query made
    looking_for = sq.fetchall()
    # Get the list of tuples generated from the query
    con.close()
    return looking_for


@router.get("/threads/{thread_id}", tags=["threads"])
async def retrieve_specified_thread(thread_id: int):
    """TODO DOES NOT CHECK IF THREAD EXISTS"""
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()  # cur is cursor
    sql_query = "SELECT * FROM Threads WHERE thread_id=?"
    sq = cur.execute(sql_query, [thread_id])
    # sq is a cursor resulting from the query made
    looking_for = sq.fetchone()
    # Get the list of tuples generated from the query
    con.close()
    return looking_for


@router.post("/threads/", tags=["threads"])
async def create_thread(name: str, desc: str):
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    try:
        cur.execute("INSERT INTO Threads(name, description) VALUES(?, ?)", [name, desc])
    except:
        con.close()
        raise HTTPException(status_code=409, detail="Conflict")
    con.commit()
    con.close()
    return {"SUCCESS": True}


@router.patch("/threads/edit/name/", tags=["threads"])
async def edit_thread_name(user_id: int, name: str, thread_id: int):
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()

    sql_query = "SELECT user_id, admin FROM Users WHERE user_id = ?"
    sq = cur.execute(sql_query, [user_id])
    looking_for = sq.fetchone()
    if not looking_for:
        con.close()
        raise HTTPException(status_code=404, detail="User not found")
    user_id = looking_for["user_id"]
    is_admin = looking_for["admin"]
    if not is_admin:
        con.close()
        raise HTTPException(status_code=401, detail="User not Authorized")
    sql_query = """UPDATE Threads
                    SET name = ?
                    WHERE thread_id = ?"""
    cur.execute(sql_query, [name, thread_id])
    con.commit()
    con.close()
    return {"SUCCESS": True}


@router.patch("/threads/edit/description/", tags=["threads"])
async def edit_thread_description(user_id: int, description: str, thread_id: int):
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    sql_query = "SELECT user_id, admin FROM Users WHERE user_id = ?"
    sq = cur.execute(sql_query, [user_id])
    looking_for = sq.fetchone()
    if not looking_for:
        con.close()
        raise HTTPException(status_code=404, detail="User not found")
    user_id = looking_for["user_id"]
    is_admin = looking_for["admin"]
    if not is_admin:
        raise HTTPException(status_code=401, detail="User not Authorized")
    sql_query = """UPDATE Threads
                    SET description = ?
                    WHERE thread_id = ?"""
    cur.execute(sql_query, [description, thread_id])
    con.commit()
    con.close()
    return {"SUCCESS": True}


@router.delete("/threads/", tags=["threads"])
async def delete_thread(user_id: int, thread_id: int):
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    sql_query = "SELECT user_id, admin FROM Users WHERE user_id = ?"
    sq = cur.execute(sql_query, [user_id])
    looking_for = sq.fetchone()
    if not looking_for:
        con.close()
        raise HTTPException(status_code=404, detail="User not found")
    is_admin = looking_for["admin"]
    if not is_admin:
        con.close()
        raise HTTPException(status_code=401, detail="User not Authorized")
    sql_query = """DELETE FROM Threads
                    WHERE thread_id = ?"""
    try:
        cur.execute(sql_query, [thread_id])
    except sqlite3.IntegrityError:
        con.close()
        raise sqlite3.IntegrityError
    con.commit()
    con.close()
    return {"SUCCESS": True}

import sqlite3

from fastapi import APIRouter, HTTPException

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

@router.patch("/threads/edit/name/", tags=["threads"])
async def edit_thread_name(username: str, name: str, thread_id: int):
    con = sqlite3.connect("project.db")
    # ncon.row_factory = row_to_dict
    cur = con.cursor()
    try:
        sql_query = f"SELECT user_id, admin FROM Users WHERE username = '{username}'"
        sq = cur.execute(sql_query)
    except:
        raise HTTPException(status_code=404, detail="User not found")
    looking_for = sq.fetchone()
    user_id, is_admin = looking_for
    if not is_admin:
        raise HTTPException(status_code=401, detail="User not Authorized")
    sql_query = f"""UPDATE Threads 
                    SET name = '{name}' 
                    WHERE thread_id = {thread_id}"""
    cur.execute(sql_query)
    con.commit()
    con.close()
    return {"SUCCESS": True}

@router.patch("/threads/edit/description/", tags=["threads"])
async def edit_thread_description(username: str, description: str, thread_id: int):
    con = sqlite3.connect("project.db")
    # ncon.row_factory = row_to_dict
    cur = con.cursor()
    try:
        sql_query = f"SELECT user_id, admin FROM Users WHERE username = '{username}'"
        sq = cur.execute(sql_query)
    except:
        raise HTTPException(status_code=404, detail="User not found")
    looking_for = sq.fetchone()
    user_id, is_admin = looking_for
    if not is_admin:
        raise HTTPException(status_code=401, detail="User not Authorized")
    sql_query = f"""UPDATE Threads 
                    SET description = '{description}' 
                    WHERE thread_id = {thread_id}"""
    cur.execute(sql_query)
    con.commit()
    con.close()
    return {"SUCCESS": True}

@router.delete("/threads/", tags=["threads"])
async def delete_thread(username: str, thread_id: int):
    con = sqlite3.connect("project.db")
    # ncon.row_factory = row_to_dict
    cur = con.cursor()
    sql_query = f"SELECT user_id, admin FROM Users WHERE username = '{username}'"
    sq = cur.execute(sql_query)
    looking_for = sq.fetchone()
    if not looking_for:
        raise HTTPException(status_code=404, detail="User not found")
    user_id, is_admin = looking_for
    if not is_admin:
        raise HTTPException(status_code=401, detail="User not Authorized")
    sql_query = f"""DELETE FROM Threads 
                    WHERE thread_id = {thread_id}"""
    cur.execute(sql_query)
    con.commit()
    con.close()
    return {"SUCCESS": True}


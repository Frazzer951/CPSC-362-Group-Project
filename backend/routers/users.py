import sqlite3

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from utils import row_to_dict

router = APIRouter()


@router.get("/users/{user_id}", tags=["users"])
async def retrieve_user_data(user_id: int):
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()  # cur is cursor
    sql_query = "SELECT * FROM Users WHERE user_id = ?"
    sq = cur.execute(sql_query, [user_id])
    # sq is a cursor resulting from the query made
    looking_for = sq.fetchone()
    # Get the list of tuples generated from the query
    con.close()
    return looking_for
# grabs all comments and posts made by a user



class User(BaseModel):
    username: str
    password: str


@router.post("/user/create", tags=["users"])
async def create_user(user: User):
    # user.username, user.password
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()  # cur is cursor
    sql_query = "INSERT INTO Users(username, password, admin) VALUES(?, ?, ?)"
    try:
        cur.execute(sql_query, [user.username, user.password, False])
        con.commit()
    except sqlite3.IntegrityError:
        con.close()
        raise HTTPException(status_code=406, detail="User already exists")
    # sq is a cursor resulting from the query made

    # Get the list of tuples generated from the query
    con.close()
    # check if user already exists
    # if it does error 406
    # otherwise return success
    return {"detail": "SUCCESS"}


@router.post("/user/auth/", tags=["users"])
async def authenticate_user(user: User):
    # TODO: Use FastAPI Authentication to authenticate the user securely
    # if user does not exist or password return 401
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()  # cur is cursor
    sql_query = "SELECT user_id, admin FROM Users WHERE username = ? AND password = ?"
    sq = cur.execute(sql_query, [user.username, user.password])
    looking_for = sq.fetchone()
    if not looking_for:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return looking_for

@router.patch("/user/about-me/", tags=["users"])
async def edit_about_me(username: str, text: str):
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()  # cur is cursor
    sql_query = f"""UPDATE Users 
                    SET about_me = '{text}' 
                    WHERE username = '{username}'"""
    try:
        sq = cur.execute(sql_query)
    except:
        con.close()
        raise HTTPException(status_code=404, detail="User not found")
    con.commit()
    # except:
    #      con.close()
    #      raise HTTPException(status_code=400, detail="Bad Request")
    con.close()
    return {"detail": "SUCCESS"}



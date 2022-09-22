from concurrent.futures import thread
from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from pydantic import BaseModel
from utils import row_to_dict
import sqlite3

router = APIRouter()

@router.get("/users/{user_id}")
async def retrieve_specified_username(user_id: int):
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    cur = con.cursor()  # cur is cursor
    sql_query = "SELECT username FROM Users WHERE user_id = ?"
    sq = cur.execute(sql_query, [user_id])
    # sq is a cursor resulting from the query made
    looking_for = sq.fetchone()
    # Get the list of tuples generated from the query
    con.close()
    return looking_for


class User(BaseModel):
    username: str
    password: str

@router.post("/user/create")
async def create_user(user: User):
    #user.username, user.password
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    cur = con.cursor()  # cur is cursor
    sql_query = "INSERT INTO Users(username, password) VALUES(?, ?)"
    
    cur.execute(sql_query, [user.username, user.password])
    con.commit()
    # except:
    #     raise HTTPException(
    #         status_code=status.HTTP_406_NOT_FOUND, detail="User already exists"
    #     )  
    # sq is a cursor resulting from the query made
    
    #Get the list of tuples generated from the query
    con.close()
    # check if user already exists
        # if it does error 406
    # otherwise return success
    return {"detail": "SUCCESS"}

@router.get("/auth/")
async def authenticate_user(user: User):
    # if user does not exist or password return 401
    return {"userID": 0, "isAdmin": True}

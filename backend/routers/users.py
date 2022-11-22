import sqlite3

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils import Text, row_to_dict

router = APIRouter()
# https://stackoverflow.com/questions/15961213/sql-multiple-foreign-keys-as-primary-keys

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


@router.get("/posts/{user_id}", tags=["users"])
async def retrieve_posts_from_user(user_id: int):
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()  # cur is cursor
    sql_query = f"""SELECT U.username, P.post_id, P.user_id, P.title FROM
                    Posts P, Users U WHERE user_id = {user_id}
                    AND P.user_id = U.user_id"""
    sq = cur.execute(sql_query)
    # sq is a cursor resulting from the query made
    looking_for = sq.fetchall()
    for post in looking_for:
        sql_query = """SELECT COUNT(CASE WHEN like_state = 1 THEN 1 END) AS likes,
                              COUNT(CASE WHEN like_state = 0 THEN 1 END) AS dislikes
                              FROM LIKES WHERE post_id = ?"""
    # Get the list of tuples generated form the query
        sq = cur.execute(sql_query, [post["post_id"]])
        lds = sq.fetchone()
        post.update(lds)
        # Combine the dictionaries so they include the likes and dislikes of each post
    con.close()
    return looking_for


class User(BaseModel):
    username: str
    password: str


@router.post("/user/create", tags=["users"])
async def create_user(user: User):
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
    con.close()
    return {"detail": "SUCCESS"}


@router.post("/user/auth/", tags=["users"])
async def authenticate_user(user: User):
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
async def edit_about_me(user_id: int, text: Text):
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()  # cur is cursor
    sql_query = f"SELECT user_id FROM Users WHERE user_id = {user_id}"
    sq = cur.execute(sql_query)
    looking_for = sq.fetchone()
    if not looking_for:
        raise HTTPException(status_code=404, detail="User not found")
    sql_query = f"""UPDATE Users
                    SET about_me = '{text.text}'
                    WHERE user_id = {user_id}"""
    try:
        cur.execute(sql_query)
    except Exception as error:
        con.close()
        raise error
    con.commit()
    con.close()
    return {"detail": "SUCCESS"}


"""THE about me is having issue with a string that has an apostrphe in it"""

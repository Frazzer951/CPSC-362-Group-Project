import sqlite3

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from utils import row_to_dict

router = APIRouter()


class Comment(BaseModel):
    user_id: int
    post_id: int
    body: str


@router.get("/comments/{post_id}", tags=["comments"])
async def retrieve_comments_from_post(post_id: int):
    con = sqlite3.connect("project.db")  # con is connection
    con.row_factory = row_to_dict
    cur = con.cursor()  # cur is cursor
    sql_query = f"""SELECT username, body, comment_id
                    FROM Comments C, Users U
                    WHERE C.post_id = {post_id} and U.user_id = C.user_id"""
    sq = cur.execute(sql_query)
    # sq is a cursor resulting from the query made
    looking_for = sq.fetchall()

    con.close()
    return looking_for


@router.post("/comments/", tags=["comments"])
async def create_comment_on_post(comment: Comment):
    con = sqlite3.connect("project.db")
    cur = con.cursor()
    sql_query = "INSERT INTO Comments(user_id, post_id, body) VALUES(?, ?, ?)"
    cur.execute(sql_query, [comment.user_id, comment.post_id, comment.body])
    con.commit()
    con.close()
    return {"SUCCESS": True}

@router.patch("/comments/edit/", tags=["comments"])
async def edit_comment(username: str, body: str, comment_id: int, post_id: int):
    con = sqlite3.connect("project.db")
    # ncon.row_factory = row_to_dict
    cur = con.cursor()
    try:
        sql_query = f"SELECT user_id FROM Users WHERE username = '{username}'"
    except:
        raise HTTPException(status_code=404, detail="User not found")
    sq = cur.execute(sql_query)
    looking_for = sq.fetchone()
    user_id = looking_for
    try:
        sql_query = f"""UPDATE Comments 
                        SET body = '{body}' 
                        WHERE user_id = '{user_id}' AND 
                            post_id = '{post_id}' AND
                            comment_id = {comment_id}"""
        cur.execute(sql_query)
    except:
        raise HTTPException(status_code=404, detail="User not found")
    con.commit()
    con.close()
    return {"SUCCESS": True}


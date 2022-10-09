import sqlite3

from fastapi import APIRouter
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
    sql_query = f"""SELECT username, body
                    FROM Comments C, Users U
                    WHERE C.post_id = {post_id} and U.user_id = C.user_id"""
    sq = cur.execute(sql_query)
    # sq is a cursor resulting from the query made
    looking_for = sq.fetchall()

    con.close()
    return looking_for


@router.post("/comments/", tags=["comments"])
async def create_comment_on_post(comment: Comment):
    # We can use pydantic classes instead of so many arguments
    # Something we can do later
    con = sqlite3.connect("project.db")
    cur = con.cursor()
    sql_query = "INSERT INTO Comments(user_id, post_id, body) VALUES(?, ?, ?)"
    cur.execute(sql_query, [comment.user_id, comment.post_id, comment.body])
    con.commit()
    con.close()
    return {"SUCCESS": True}

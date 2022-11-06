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
    con.execute("PRAGMA foreign_keys = ON")
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
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    sql_query = "INSERT INTO Comments(user_id, post_id, body) VALUES(?, ?, ?)"
    try:
        cur.execute(sql_query, [comment.user_id, comment.post_id, comment.body])
    except:
        con.close()
        raise HTTPException(status_code=409, detail="Conflict")
    con.commit()
    con.close()
    return {"SUCCESS": True}

@router.patch("/comments/edit/", tags=["comments"])
async def edit_comment(user_id: int, body: str, comment_id: int, post_id: int):
    "TODO Does not catch when comment or post does not exist"
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    sql_query = f"SELECT user_id FROM Users WHERE user_id = {user_id}"
    sq = cur.execute(sql_query)
    looking_for = sq.fetchone()
    if not looking_for:
        con.close()
        raise HTTPException(status_code=404, detail="User not found")
    sql_query = f"""UPDATE Comments 
                    SET body = '{body}' 
                    WHERE user_id = {user_id} AND 
                        post_id = {post_id} AND
                        comment_id = {comment_id}"""
    try:
        cur.execute(sql_query)
    except:
        con.close()
        raise HTTPException(status_code=409, detail="Conflict")
    con.commit()
    con.close()
    return {"SUCCESS": True}

@router.delete("/comments/", tags=["comments"])
async def delete_comment(user_id: int, comment_id: int):
    """TODO Does not catch when comment or post does not exist"""
    """TODO May want to require post_id as well"""
    """TODO Match user to comment. (Users can only delete their own comments)
    It does this but no error thrown if they don't match. Can be handled by front end"""
    con = sqlite3.connect("project.db")
    con.row_factory = row_to_dict
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    sql_query = f"SELECT user_id FROM Users WHERE user_id = {user_id}"
    sq = cur.execute(sql_query)
    looking_for = sq.fetchone()
    if not looking_for:
        con.close()
        raise HTTPException(status_code=404, detail="User not found")
    sql_query = f"""DELETE FROM Comments 
                    WHERE user_id = {user_id} AND 
                        comment_id = {comment_id}"""
    try:
        cur.execute(sql_query)
    except sqlite3.IntegrityError:
        con.close()
        raise HTTPException(status_code=409, detail="Conflict")
    except:
        con.close()
        raise HTTPException(status_code=404, detail="Comment not found")
    con.commit()
    con.close()
    return {"SUCCESS": True}


# db_create.sql allows me to insert into comments even if I dont use a
# correct foreign key value. kinda weird 
"""DELETE still remove if it exists with a return true, not sure if we want that"""
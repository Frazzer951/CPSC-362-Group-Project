import sqlite3

from pydantic import BaseModel

"""Stack overflow: https://stackoverflow.com/a/68991192"""


def row_to_dict(cursor: sqlite3.Cursor, row: sqlite3.Row) -> dict:
    data = {}
    for idx, col in enumerate(cursor.description):
        data[col[0]] = row[idx]
    return data


# Text object so query can accept multiline strings
class Text(BaseModel):
    text: str

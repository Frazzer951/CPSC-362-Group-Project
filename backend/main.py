from fastapi import FastAPI

from routers import threads, postz, comments, users
app = FastAPI()

"""Credit to JVP Design and tiangolo website for teaching how to route:
    https://www.youtube.com/watch?v=OzFyOC90v6U
    https://fastapi.tiangolo.com/tutorial/bigger-applications/
"""

app.include_router(threads.router)
app.include_router(postz.router)
app.include_router(comments.router)
app.include_router(users.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Titan Forums"}
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import threads, postz, comments, users
app = FastAPI()

"""Credit to JVP Design and tiangolo website for teaching how to route:
    https://www.youtube.com/watch?v=OzFyOC90v6U
    https://fastapi.tiangolo.com/tutorial/bigger-applications/
"""

origins = [
    "http://www.frazzer.net",
    "https://www.frazzer.net",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(threads.router)
app.include_router(postz.router)
app.include_router(comments.router)
app.include_router(users.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Titan Forums"}
import logging
from typing import Optional

from contextlib import asynccontextmanager
from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError
from fastapi import Depends

from src import config
from src.db_pg import PostgresDB
from src.domain import Chat, ChatHeader, Event


logger = logging.getLogger('uvicorn')
logger.setLevel(config.UVICORN_LOGGING_LEVEL)


@asynccontextmanager
async def lifespan(app: FastAPI):
    db = PostgresDB()
    await db.connect()
    app.state.database = db

    yield
    # Anything after yield is called at shutdown
    await app.state.database.disconnect()


app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:8000",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_database() -> PostgresDB:
    return app.state.database

@app.get("/_status/healthz")
async def root():
    return {"message": "OK"}



@app.get("/chats", response_model=list[ChatHeader])
async def get_chats(db: PostgresDB = Depends(get_database)):
    rows = await db.fetch(
        """
        SELECT sender_id,
        MAX("timestamp") AS timestamp
        FROM events
        GROUP BY sender_id
        ORDER BY timestamp DESC;
        """
    )

    chats = []
    for row in rows:
        chat = ChatHeader(**row)
        chats.append(chat)

    return chats


@app.get("/chats/{sender_id}", response_model=Chat)
async def get_chat_history(sender_id: str, db: PostgresDB = Depends(get_database)):
    rows = await db.fetch(
        """
        SELECT 
        id, sender_id, type_name,
        timestamp, intent_name,
        action_name, (data::jsonb) AS data
        FROM events
        WHERE sender_id = $1
        ORDER BY id desc
        """
        ,
        sender_id
    )
    if not rows:
        raise HTTPException(status_code=404, detail="Conversation not found")

    events = [Event(**row) for row in rows]
    chat = Chat(sender_id=sender_id, events=events)
    return chat


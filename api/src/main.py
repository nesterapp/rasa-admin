import logging
import requests
import os

from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from src import config
from src.db_pg import PostgresDB
from src.domain import Chat, ChatHeader, Event, MessagePaload
from src.utils import get_jwt_token

logger = logging.getLogger('uvicorn')
logger.setLevel(config.UVICORN_LOGGING_LEVEL)
load_dotenv()

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
    """Get all chat headers, not including messages (only sender_id and timestamp)"""

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
async def get_chat_details(sender_id: str, db: PostgresDB = Depends(get_database)):
    """Get specific chat with all of it's related events

    Args:
        sender_id
    """
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


@app.post("/chats/{sender_id}/message")
async def send_message(
    sender_id: str,
    message: MessagePaload,
    jwt_token: str = Depends(get_jwt_token)
):
    """Send a text message from Rasa Bot to a user via channel

    Args:
        sender_id: the recipient id for the message
        message: the text message to send. i.e payload { "text": "foobar" }

    see: https://rasa.com/docs/rasa/pages/http-api#operation/addConversationTrackerEvents
    """

    rasa_url = os.getenv("RASA_SERVER_API_URL")
    assert rasa_url

    url = f"{rasa_url}/conversations/{sender_id}/tracker/events"

    query_params = {
        "output_channel": "telegram", # TODO: why failing to send with "latest"
        "execute_side_effects": "true"
    }
    
    payload = {
        "event": "bot",
        "text": message.text
    }
    
    headers = {
        "Authorization": f"Bearer {jwt_token}",
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, params=query_params, json=payload, headers=headers)
    
    if response.status_code == 200:
        return {"message": "Message sent successfully"}
    else:
        return {"message": "Failed to send message"}

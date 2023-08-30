import re
import json
from typing import Optional

from pydantic import BaseModel, constr, validator

class EventData(BaseModel):
    event: str
    text: Optional[str]

class Event(BaseModel):
    id: int
    sender_id: str
    type_name: str
    timestamp: float
    intent_name: Optional[str]
    action_name: Optional[str]
    data: EventData

    @validator('data', pre=True)
    def data_str_to_dict(cls, v):
        if isinstance(v, dict):
            return v
        elif isinstance(v, str):
            try:
                d = json.loads(v)
            except:
                raise ValueError('Failed to convert data text to dictionary')
            return d
        return v

class ChatHeader(BaseModel):
    sender_id: str
    timestamp: float

class Chat(BaseModel):
    sender_id: str
    events: list[Event]

class MessagePaload(BaseModel):
    text: str
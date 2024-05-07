import jwt
import os

def encode_jwt_token(jwt_secret_key: str) -> str:

    payload = {
        "user": {
            "role": "admin"
        }
    }

    return jwt.encode(payload, jwt_secret_key, algorithm="HS256")

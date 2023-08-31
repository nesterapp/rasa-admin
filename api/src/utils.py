import jwt
import os

def get_jwt_token() -> str:

    secret_key = os.getenv("RASA_SERVER_API_JWT_SECRET_KEY")
    assert secret_key

    payload = {
        "user": {
            "role": "admin"
        }
    }

    return jwt.encode(payload, secret_key, algorithm="HS256")

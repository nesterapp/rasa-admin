# Rasa Admin web-app ( humble Rasa-X replacement )

A simple yet very useful Rasa backoffice web-app for tracking your Rasa bot
conversations with users.  
Currently supports Rasa running on PostgreSQL DB.

![screenshot](https://raw.githubusercontent.com/nesterapp/rasa-admin/main/screenshot.png)

### Features:
- Watch Bot<->users conversations on a chat like interface
- Send a message to user ( as Bot )

### Built with:

- Frontend: React JS
- API Backend: FastAPI, Pydantic, asyncpg

## Install API:
```sh
cd api
pyenv virtualenv 3.11.3 rasa-admin-api
pyenv activate rasa-admin-api
pyenv local rasa-admin-api
pip install -e .
```

## Configure API:
Copy .env_sample to .env and configure all it's values
```sh
cd api
cp .env_sample .env
vim .env
```

## Run API:
if you have [just](https://just.systems/) tool installed:
```sh
just run
```
or, if not:
```sh
uvicorn src.main:app --reload --port 5000
```

## Run Web-app:
```sh
cd frontend
yarn install
yarn start
```

### Upcoming:
- Human handoff - ability to pause and resume bot-user conversation during handoff.
- Auto refresh

MIT License  
Nester (c) 2023
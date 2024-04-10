# Rasa Admin web-app (humble Rasa-X replacement)

A simple, yet useful Rasa backoffice web-app for tracking your Rasa bot
conversations with users.. And more.

![screenshot](https://raw.githubusercontent.com/nesterapp/rasa-admin/main/screenshot.png)

### Features
- Watch Bot<->users conversations on a chat like interface
- Send a message to user ( as Bot )

### Built with

### Built with
- Frontend: React JS
- API Backend: FastAPI, Pydantic, asyncpg

## Prerequisites
Your Rasa should have an active PostgreSQL tracker store,
or, if you wish to install one, see this [guide](https://rasa.com/docs/rasa/tracker-stores/).
Use the same DB connection details for the next step.

> Tested only with PostgreSQL.

## Installation steps summary
1. Install and run the backend API service (python).
2. Install and run the ReactJS app.
> All calls to tracker store database and to your Rasa server are handled by
the backend api.

## 1. Install and run backend API service

### Configure
Copy .env.sample to .env,  
then edit to provide your PostgreSQL and RASA server details.

```sh
cd api
cp .env.sample .env
vim .env
```

### Install API
```sh
cd api
pyenv virtualenv 3.11.3 rasa-admin-api
pyenv activate rasa-admin-api
pyenv local rasa-admin-api
pip install -e .
```

### Run API
If you have [just](https://just.systems/) tool installed:

```sh
just run
```

Or, if not:

```sh
uvicorn src.main:app --reload --port 5000
```

## 2. Install and run ReactJS app

```sh
cd frontend
yarn install
yarn start
```

Open your browser http://localhost:3000

### Upcoming
- Human hand-off — ability to pause and resume bot-user conversation during hand-off.
- Auto refresh

Feel free to suggest features or submit PRs!

## License

MIT License

Nester (c) 2024

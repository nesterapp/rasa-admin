FROM python:3.11.3-slim

WORKDIR /code/api

COPY ./requirements.txt ./

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./src src
COPY .env .env

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "5000"]

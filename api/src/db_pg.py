import asyncpg
from asyncpg import Pool
from dotenv import load_dotenv
import os


class PostgresDB:
    def __init__(self):
        self.pool: Pool = None
        self.load_env()
        self.dsn = self.build_dsn()

    def load_env(self):
        # dotenv_path = ".env"
        load_dotenv()

    def build_dsn(self):
        db_host = os.getenv("POSTGRES_HOST")
        db_port = os.getenv("POSTGRES_PORT")
        db_name = os.getenv("POSTGRES_DB_NAME")
        db_user = os.getenv("POSTGRES_USER")
        db_password = os.getenv("POSTGRES_PASSWORD")
        return f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

    async def connect(self):
        self.pool = await asyncpg.create_pool(dsn=self.dsn)

    async def disconnect(self):
        await self.pool.close()

    async def execute(self, query: str, *args):
        connection: asyncpg.Connection
        async with self.pool.acquire() as connection:
            await connection.execute(query, *args)

    async def execute_transaction(self, queries):
        connection: asyncpg.Connection
        async with self.pool.acquire() as connection:
            async with connection.transaction():
                for query, *args in queries:
                    await connection.execute(query, *args)

    async def fetchrow(self, query: str, *args) -> asyncpg.Record:
        connection: asyncpg.Connection
        async with self.pool.acquire() as connection:
            result = await connection.fetchrow(query, *args)
            return result

    async def fetch(self, query: str, *args) -> list[asyncpg.Record]:
        connection: asyncpg.Connection
        async with self.pool.acquire() as connection:
            result = await connection.fetch(query, *args)
            return result

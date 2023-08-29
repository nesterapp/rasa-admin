# rasa-admin api config
# ---
import pathlib

project_root = pathlib.Path(__file__).parent.parent.resolve()

UVICORN_LOGGING_LEVEL = 'DEBUG' # 'INFO' / 'WARNING' / 'ERROR' / 'DEBUG'

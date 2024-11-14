from dotenv import load_dotenv
from os import getenv

from database_manager import DatabaseManager
from fastapi import FastAPI

def get_url() -> str:
    load_dotenv(".secrets")

    spreadsheet_ID: str = getenv("SPREADSHEET_ID")
    sheet_ID: str = getenv("SHEET_ID")

    return f"https://docs.google.com/spreadsheets/d/{spreadsheet_ID}/export?format=csv&gid={sheet_ID}"

app = FastAPI()
db = DatabaseManager(url=get_url())

@app.get("/")
def root():
    return {"status": "alive"}

@app.get("/statics/{column}/{return_type}")
def get_column_table(column: str, return_type: str):
    if column not in db.columns():
        return {
                "ERROR": f"Column {column} does not exist",
                "FIX": f"Use any of {db.columns()}"
            }
    if return_type not in ["table", "mode", "graph"]:
        return {
                "ERROR": f"Return type {return_type} does not exist",
                "FIX": "Use any of ['table', 'mode', 'graph']"
            }

    if return_type == "table":
        return db.column_table(column)
    elif return_type == "mode":
        return db.column_mode(column)
    elif return_type == "graph":
        return [[value[0], value[1]] for value in db.column_table(column)]

@app.get("/query/{query_type}/{return_type}")
def get_combination(query_type: str, return_type: str, conditions: dict):
    if query_type not in ["combination", "comparison"]:
        return {
                "ERROR": f"Query type {query_type} does not exist",
                "FIX": "Use 'combination' or 'comparison'"
            }
    elif return_type not in ["table", "graph"]:
        return {
                "ERROR": f"Return type {return_type} does not exist",
                "FIX": "Use any of ['table', 'graph']"
            }

    try:
        if query_type == "combination":
            table = db.query_combination(**conditions)
        elif query_type == "comparison":
            table = db.query_comparison(**conditions)

        if return_type == "table":
            return table
        elif return_type == "graph":
            return [[value[0], value[1]] for value in table]
    except:
        return {
                "ERROR": "Payload was incorrect",
                "FIX": f"Check your payload",
                "PAYLOAD": conditions
            }

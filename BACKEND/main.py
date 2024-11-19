from dotenv import load_dotenv
from os import getenv

import uvicorn

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from database_manager import DatabaseManager

def get_url() -> str:
    load_dotenv()

    spreadsheet_ID: str = getenv("SPREADSHEET_ID")
    sheet_ID: str = getenv("SHEET_ID")

    return f"https://docs.google.com/spreadsheets/d/{spreadsheet_ID}/export?format=csv&gid={sheet_ID}"

app = FastAPI()
db = DatabaseManager(url=get_url())

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return JSONResponse(content={"status": "alive"})

@app.get("/statics/{column}/{return_type}")
def get_column_table(column: str, return_type: str):
    if column not in db.columns():
        response = {
                "ERROR": f"Column {column} does not exist",
                "FIX": f"Use any of {db.columns()}"
            }
    if return_type not in ["table", "mode", "graph"]:
        response = {
                "ERROR": f"Return type {return_type} does not exist",
                "FIX": "Use any of ['table', 'mode', 'graph']"
            }

    if return_type == "table":
        response = db.column_table(column)
    elif return_type == "mode":
        response = db.column_mode(column)
    elif return_type == "graph":
        response = [[value[0], value[1]] for value in db.column_table(column)]

    return JSONResponse(content=response)

@app.post("/query/{query_type}/{return_type}")
def get_combination(query_type: str, return_type: str, conditions: dict):
    if query_type not in ["combination", "comparison"]:
        response = {
                "ERROR": f"Query type {query_type} does not exist",
                "FIX": "Use 'combination' or 'comparison'"
            }
    elif return_type not in ["table", "graph"]:
        response = {
                "ERROR": f"Return type {return_type} does not exist",
                "FIX": "Use any of ['table', 'graph']"
            }

    try:
        if query_type == "combination":
            table = db.query_combination(**conditions)
        elif query_type == "comparison":
            table = db.query_comparison(**conditions)

        if return_type == "table":
            response = table
        elif return_type == "graph":
            response = [[value[0], value[1]] for value in table]
    except:
        response = {
                "ERROR": "Payload was incorrect",
                "FIX": f"Check your payload",
                "PAYLOAD": conditions
            }

    return JSONResponse(content=response)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

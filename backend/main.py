import os
import requests
import pandas as pd
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load API Key dari .env
load_dotenv()
API_KEY = os.getenv("API_KEY")
SPREADSHEET_ID = os.getenv("SPREADSHEET_ID")

app = FastAPI()

# Konfigurasi CORS agar React bisa akses API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Bisa diatur hanya untuk domain tertentu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fungsi untuk mengambil data dari Google Sheets
def fetch_data(sheet_name):
    url = f"https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/{sheet_name}?key={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json().get("values", [])
        df = pd.DataFrame(data[1:], columns=data[0])  # Gunakan baris pertama sebagai header
        return df.to_dict(orient="records")
    return []

# Endpoint API untuk mengambil daftar sheet
@app.get("/sheets")
def get_sheets():
    url = f"https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}?key={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        sheets = response.json().get("sheets", [])
        return {"sheets": [sheet["properties"]["title"] for sheet in sheets]}
    return {"sheets": []}

# Endpoint API untuk mengambil data dari sheet tertentu
@app.get("/data/{sheet_name}")
def get_data(sheet_name: str):
    return {"data": fetch_data(sheet_name)}


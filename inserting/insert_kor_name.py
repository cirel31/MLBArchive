import json
import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

# Database Configurations from .env file
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT"))

def write_log(log_message):
    with open("logs/korName.log", "a", encoding="utf-8") as log_file:
        log_file.write(log_message + "\n")

# 1. JSON 파일 읽기
try:
<<<<<<< HEAD
    with open("../translated_players.json", "r", encoding="utf-8") as file:
=======
    with open("translated_players.json", "r", encoding="utf-8") as file:
>>>>>>> cd0a94e9aaace2f9689023af051dbd1ae9aa239e
        players = json.load(file)
except Exception as e:
    write_log(str(e))
    players = []

# 2. MariaDB 연결
try:
    conn = mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT,
        database="S09P22A301"
    )
    cursor = conn.cursor()
except Exception as e:
    write_log(str(e))
    cursor = None

# 3. 각 JSON 항목에 대해 해당 ID를 가진 데이터를 MariaDB에서 찾고 korName 업데이트
for player in players:
    try:
        player_id = player["id"]
        kor_name = player["korName"]
        
        update_query = """
        UPDATE player
        SET kor_name = %s
        WHERE player_id = %s
        """
        
        cursor.execute(update_query, (kor_name, player_id))
    except Exception as e:
        write_log(f"Error updating player {player_id}: {str(e)}")
        continue  # Continue to the next iteration

# 변경사항 커밋
if cursor:
    conn.commit()
    cursor.close()
    conn.close()
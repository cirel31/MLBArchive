import mysql.connector
import json
import os
import logging
from dotenv import load_dotenv

# 로깅 설정
logging.basicConfig(filename='insert_log.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
load_dotenv()

# Database Configurations from .env file
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT"))

sr_id = 0
def extract_roster_info_from_file(file_path):
    global sr_id
    with open(file_path, 'r') as f:
        data = json.load(f)

    # If there's no roster in the data, return an empty list
    if "roster" not in data:
        return []

    # Extracting team_id and season from the filename
    file_name = os.path.basename(file_path)
    team_id_str, season = file_name.replace("roster_", "").replace(".json", "").split("_")
    team_id = int(team_id_str)
    result_list = []
    for player in data["roster"]:
        player_id = int(player["person"]["id"])
        sr_id += 1
        result_list.append((season, player_id, sr_id, team_id))

    return result_list



# 파일 목록을 가져옵니다.
directory_path = '../teamroster/rosters'
all_files = [f for f in os.listdir(directory_path) if f.startswith('roster_') and f.endswith('.json')]

# 2. MariaDB 연결
try:
    conn = mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT,
        database="s09p22a301"
    )
    cursor = conn.cursor()
except Exception as e:
    cursor = None

for file in all_files:
    file_path = os.path.join(directory_path, file)
    data_to_insert = extract_roster_info_from_file(file_path)

    # 데이터베이스에 데이터 삽입
    for item in data_to_insert:
        query = "INSERT INTO season_roster (season, player_id, sr_id, team_id) VALUES (%s, %s, %s, %s)"
        try:
            cursor.execute(query, item)
            logging.info(f"Successfully inserted data: {item}")
        except Exception as e:
            logging.error(f"Error while inserting data {item}. Error: {e}")

# 변경사항 저장
conn.commit()

# 연결 종료
cursor.close()
conn.close()
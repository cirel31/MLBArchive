import logging
import mysql.connector
import json
from datetime import datetime
from dotenv import load_dotenv
import os
from collections import defaultdict

def insert_fielding_data(cursor, player_id, season, career_stat, season_stat, data):
    if career_stat:
        stats = career_stat
    elif season_stat:
        stats = season_stat
    else:
        return

    error = stats.get("errors")
    assist = stats.get("assists")
    putout = stats.get("putOuts")
    games_played = stats.get("gamesPlayed")

    position = stats.get("position")
    if position:
        position = position.get("name").upper()
    else:
        position = data.get("primaryPosition").get("name").upper()
    position = position.replace(" ", "_")
    position = position.replace("-", "_")

    cursor.execute('''
        INSERT INTO `Fielding` (player_id, season, error, assist, putout, games_played, position)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    ''', (player_id, season, error, assist, putout, games_played, position))

def parse_float(value):
    try:
        return float(value)
    except ValueError:
        return 0

load_dotenv()
# 로그 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s: %(message)s')
log_file_handler = logging.FileHandler('logs/insert_fielding.log')
log_file_handler.setLevel(logging.INFO)
log_formatter = logging.Formatter('%(asctime)s - %(levelname)s: %(message)s')
log_file_handler.setFormatter(log_formatter)
logger = logging.getLogger()
logger.addHandler(log_file_handler)

db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")

# MariaDB 연결 설정
config = {
    'user': db_user,
    'password': db_password,
    'host': db_host,
    "port": 3306,
    "database": "S09P22A301",  
}

# 연결 생성
connection = mysql.connector.connect(**config)

# 커서 생성
cursor = connection.cursor()

folder_path = 'players_stat'
for filename in os.listdir(folder_path):
    if filename.endswith('.json'):
        try:
            with open(os.path.join(folder_path, filename), 'r') as json_file:
                data = json.load(json_file)
                player_id = data.get("id")
                stats = data.get("stats")
                if stats is None:
                    continue
                    
                main_position = data.get("primaryPosition").get("name").upper()
                main_position = main_position.replace(" ", "_")
                main_position = main_position.replace("-", "_")
                for stat in stats:
                    if stat.get("group").get("displayName") == "fielding":
                        if stat.get("type").get("displayName") == "career":
                            splits = stat["splits"]
                            season = -1
                            career_stat = defaultdict()
                            career_stat["position"] = main_position
                            for split in splits:
                                career_stat["errors"] += split["errors"] 
                                career_stat["putOuts"] += split["putOuts"]
                                career_stat["assists"] += split["assists"]
                                career_stat["gamesPlayed"] += split["gamesPlayed"]

                            insert_fielding_data(cursor, player_id, season, career_stat, None, data)
                        
                        
                        elif stat.get("type").get("displayName") == "yearByYear":
                            splits = stat.get("splits")
                            seasons = set(item['season'] for item in splits)
                            season_stat = dict()
                            season_stat["position"] = main_position
                            for season in seasons:
                                season_stat["errors"] = sum(item["stat"]["errors"] for item in splits if item["season"] == season)   
                                season_stat["putOuts"] = sum(item["stat"]["assists"] for item in splits if item["season"] == season)
                                season_stat["assists"] = sum(item["stat"]["putOuts"] for item in splits if item["season"] == season)
                                season_stat["gamesPlayed"] = sum(item["stat"]["gamesPlayed"] for item in splits if item["season"] == season)
                                
                                insert_fielding_data(cursor, player_id, season, None, season_stat, data)
                            connection.commit()
                            logging.info(f"데이터 삽입 성공: {filename}")
        except mysql.connector.IntegrityError as e:
            continue
        except Exception as e2:
            logging.error(f"{filename} 에러 발생: {str(e2)}")

# 연결 종료
cursor.close()
connection.close()

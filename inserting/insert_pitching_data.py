import logging
import mysql.connector
import json
from datetime import datetime
from dotenv import load_dotenv
import os

def parse_float(value):
    try:
        return float(value)
    except ValueError:
        return 0

def insert_pitching_data(cursor, player_id, season, career_stat, season_stat):
    if career_stat:
        stats = career_stat
    elif season_stat:
        stats = season_stat
    else:
        return

    games_played = stats.get("gamesPitched")
    innings_played = parse_float(stats.get("inningsPitched"))
    win = stats.get("wins")
    lose = stats.get("losses")
    era = parse_float(stats.get("era"))
    save = stats.get("saves")
    whip = parse_float(stats.get("whip"))
    baseOnballs = int(stats.get("baseOnBalls"))
    baseOnballs = 1 if baseOnballs == 0 else baseOnballs
    kbb = int(stats.get("strikeOuts")) / baseOnballs
    blownsave = stats.get("blownSaves")

    cursor.execute('''
        INSERT INTO `Pitching` (player_id, season, games_played, innings_played, win, lose, era, save, whip, kbb, blownsave)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ''', (player_id, season, games_played, innings_played, win, lose, era, save, whip, kbb, blownsave))

load_dotenv()
# 로그 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s: %(message)s')
log_file_handler = logging.FileHandler('logs/insert_pitching.log')
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

                for stat in stats:
                    if stat.get("group").get("displayName") == "pitching":
                        if stat.get("type").get("displayName") == "career":
                            season = -1
                            career_stat = stat.get("splits")[0].get("stat")
                            insert_pitching_data(cursor, player_id, season, career_stat, None)
                        elif stat.get("type").get("displayName") == "yearByYear":
                            splits = stat.get("splits")
                            for split in splits:
                                season = split.get("season")
                                season_stat = split.get("stat")
                                insert_pitching_data(cursor, player_id, season, None, season_stat)
                            connection.commit()
                            logging.info(f"데이터 삽입 성공: {filename}")
        except mysql.connector.IntegrityError as e:
            continue
        except Exception as e2:
            logging.error(f"{filename} 에러 발생: {str(e2)}")

# 연결 종료
cursor.close()
connection.close()

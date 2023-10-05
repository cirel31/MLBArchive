import json
import mysql.connector
import os
import logging
from dotenv import load_dotenv
import re  # 정규식 사용을 위해 추가

load_dotenv()
logging.basicConfig(filename='app.log', filemode='a', format='%(asctime)s - %(message)s', level=logging.INFO)

match_detail_id = 1
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT"))

connection = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    port=DB_PORT,
    database="s09p22a301"
)
cursor = connection.cursor()

for year in range(1901, 1902):
    linescores_path = f'./linescores/linescores{year}.json'
    match_id_path = f'./match_ids/match_ids{year}.json'

    if os.path.exists(linescores_path) and os.path.exists(match_id_path):
        with open(linescores_path, 'r') as lf, open(match_id_path, 'r') as mf:
            linescores_data = json.load(lf)
            match_id_data = json.load(mf)

            # game_id를 키로 하여 match_date 딕셔너리 생성
            match_dates = {}
            for entry in match_id_data:
                date_match = re.search(r"(\d{4}-\d{2}-\d{2})", entry["summary"])
                if date_match:
                    match_dates[entry["game_id"]] = date_match.group(1)

            for entry in linescores_data:
                try:
                    game_id = entry["game_id"]
                    match_date = match_dates.get(game_id, None)

                    # 파싱 데이터 구조
                    if not entry["linescore"]["innings"]:
                        parsed_data = {
                            "id": game_id,
                            "homeId": entry["linescore"]["defense"]["team"]["id"],
                            "awayId": entry["linescore"]["offense"]["team"]["id"],
                            "homeName": entry["linescore"]["defense"]["team"].get("name", None),
                            "awayName": entry["linescore"]["offense"]["team"].get("name", None),
                            "homePitcher": None,
                            "awayPitcher": None,
                            "homeScore": 0,
                            "awayScore": 0,
                            "currentInning": 0,
                            "matchDate": match_date
                        }
                    else:
                        parsed_data = {
                            "id": game_id,
                            "homeId": entry["linescore"]["defense"]["team"]["id"],
                            "awayId": entry["linescore"]["offense"]["team"]["id"],
                            "homeName": entry["linescore"]["defense"]["team"].get("name", None),
                            "awayName": entry["linescore"]["offense"]["team"].get("name", None),
                            "homePitcher": entry["linescore"]["defense"].get("pitcher", {}).get("fullName", None),
                            "awayPitcher": entry["linescore"]["offense"].get("pitcher", {}).get("fullName", None),
                            "homeScore": entry["linescore"]["teams"]["home"].get("runs", 0),
                            "awayScore": entry["linescore"]["teams"]["away"].get("runs", 0),
                            "currentInning": entry["linescore"].get("currentInning", 0),
                            "matchDate": match_date
                        }
                    
                    cursor.execute("""
                    INSERT INTO matches (match_id, home_id, away_id, home_pitcher, away_pitcher, home_score, away_score, home_name, away_name, current_inning, status, match_date)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "FINISH", %s)
                    ON DUPLICATE KEY UPDATE home_pitcher = VALUES(home_pitcher), away_pitcher = VALUES(away_pitcher), home_score = VALUES(home_score), away_score = VALUES(away_score), current_inning = VALUES(current_inning), status = "FINISH", match_date = VALUES(match_date)
                    """, (
                        parsed_data["id"],
                        parsed_data["homeId"],
                        parsed_data["awayId"],
                        parsed_data["homePitcher"],
                        parsed_data["awayPitcher"],
                        parsed_data["homeScore"],
                        parsed_data["awayScore"],
                        parsed_data["homeName"],
                        parsed_data["awayName"],
                        parsed_data["currentInning"],
                        parsed_data["matchDate"]
                    ))
                    connection.commit()
                    success_msg = f"Successfully processed entry {game_id} for the year {year}"
                    logging.info(success_msg)
                    print(success_msg)

                except Exception as e:
                    error_msg = f"Error while processing entry {game_id} for the year {year}: {e}"
                    logging.error(error_msg)
                    print(error_msg)

cursor.close()
connection.close()

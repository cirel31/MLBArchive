import statsapi
from datetime import date, timedelta, datetime
import mysql.connector
import os
from dotenv import load_dotenv

today = date.today() -timedelta(days= 1)
end = date.today() + timedelta(days= 7)

game_schedules = statsapi.schedule(start_date=today,end_date=end, sportId=1)

load_dotenv()
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")

config = {
    'user': db_user,
    'password': db_password,
    'host': db_host,
    "port": 3306,
    "database": "s09p22a301",  
}

# MariaDB 연결
connection = mysql.connector.connect(**config)

# SQL 쿼리 실행
cursor = connection.cursor()

date_format = "%Y-%m-%d"

for game in game_schedules:
    
    match_id = game["game_id"]
    home_id = game["home_id"]
    away_id = game["away_id"]
    match_date = datetime.strptime(game["game_date"],date_format).date()
    home_name = game["home_name"]
    away_name = game["away_name"]
    
    current_inning = game["current_inning"]
    if current_inning == "":
        current_inning = 0
    else:
        current_inning = int(current_inning)
    home_score = int(game["home_score"])
    away_score = int(game["away_score"])
    
    home_pitcher = game["home_probable_pitcher"]
    away_pitcher = game["away_probable_pitcher"]
    status = game["status"]
    # print(match_id," ", home_id," ", away_id," ", match_date," ", home_name," ", away_name," ", current_inning," ", home_score," ",\
    #        away_score," ", home_pitcher," ", away_pitcher," ",status)

    cursor.execute("SELECT COUNT(*) FROM matches WHERE match_id = %s", (match_id,))
    count = cursor.fetchone()[0]

    if count > 0:
        # game_pk가 이미 존재하는 경우, 해당 행을 업데이트
        cursor.execute("""
                       UPDATE matches
                       
                       SET current_inning = %s,home_id=%s,away_id=%s, home_name=%s, away_name=%s, home_score = %s, away_score= %s, home_pitcher=%s, away_pitcher=%s, status=%s
                       
                       WHERE match_id = %s
                       """,
                       (current_inning, home_id, away_id, home_name, away_name, home_score, away_score, home_pitcher, away_pitcher, status, match_id))
    else:
        # game_pk가 존재하지 않는 경우, 새로운 행을 삽입
        cursor.execute("""
                       INSERT INTO matches (match_id, home_id, away_id, match_date,home_name,away_name,current_inning,home_score,away_score,home_pitcher,away_pitcher,status)
                       VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                       """,
                       (match_id, home_id, away_id, match_date,home_name,away_name,current_inning,home_score,away_score,home_pitcher,away_pitcher,status))

    connection.commit()

cursor.close()
connection.close()

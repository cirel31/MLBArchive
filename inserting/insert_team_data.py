import mysql.connector
from dotenv import load_dotenv
import os
import json
from datetime import datetime

load_dotenv()

db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
print(db_host)
# MariaDB 연결 설정
config = {
    'user': db_user,
    'password': db_password,
    'host': db_host,
    "port": 3306,
    "database": "S09P22A301",  
}

file_names = os.listdir("team_data")
def convert_to_datetime(year_str):
    return datetime(int(year_str), 1, 1)

# MariaDB 연결
connection = mysql.connector.connect(**config)

# SQL 쿼리 실행
cursor = connection.cursor()

try:
    for file in file_names:
        with open(f"team_data/{file}", "r") as f:
            team_data = json.load(f)

        team_id = team_data["team_id"]
        team_name = team_data["team_name"]
        created_year = convert_to_datetime(team_data["created_year"])
        team_logo = team_data["team_logo"]
        team_location = team_data["team_location"]

        cursor.execute('''
            INSERT INTO `Team` (team_id, team_name, created_year, team_logo, team_location)
            VALUES (%s, %s, %s, %s, %s)
        ''', (team_id, team_name, created_year, team_logo, team_location))
        connection.commit()
        print(f"insert success: {file}")
except Exception as e:
    print(f"JSON 파일 삽입 중 오류 발생: {e}")
finally:
    # 예외 발생 여부와 상관없이 연결과 커서 종료
    cursor.close()
    connection.close()

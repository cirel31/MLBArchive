import mysql.connector
import json
from datetime import datetime
from dotenv import load_dotenv
import os
import logging

def PtoK(pounds:str):
    kilograms = float(pounds) * 0.45
    return kilograms

def parse_height(height_str):
    if height_str == None:
        return -1
    # 문자열을 공백으로 분할하여 피트와 인치를 추출
    parts = height_str.split()
    
    feet = 0
    inches = 0
    
    # '피트'를 찾아 변환
    if "'" in parts[0]:
        feet = int(parts[0].replace("'", ""))
    
    # '인치'를 찾아 변환
    if len(parts) > 1 and '"' in parts[1]:
        inches = int(parts[1].replace('"', ''))
    
    # 피트와 인치를 센티미터로 변환
    feet_to_cm = feet * 30.48
    inches_to_cm = inches * 2.54
    
    # 센티미터로 전체 높이 계산
    height_cm = feet_to_cm + inches_to_cm
    
    return height_cm

load_dotenv()

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

# 로그 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s: %(message)s')
log_file_handler = logging.FileHandler('logs/insert_player.log')
log_file_handler.setLevel(logging.INFO)
log_formatter = logging.Formatter('%(asctime)s - %(levelname)s: %(message)s')
log_file_handler.setFormatter(log_formatter)
logger = logging.getLogger()
logger.addHandler(log_file_handler)


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
                # print(player_id)
                name = data.get("fullName")
                is_playing = data.get("active")
                height = parse_height(data.get("height"))
                if(data.get("weight") != None):
                    weight = PtoK(data.get("weight"))
                else:
                    weight = -1
                main_position = data.get("primaryPosition").get("name").upper()
                main_position = main_position.replace(" ", "_")
                main_position = main_position.replace("-", "_")
                if(data.get("pitchHand") != None):
                    main_hand = data.get("pitchHand").get("description").upper()
                else:
                    main_hand = None

                if data.get("mlbDebutDate") != None:  
                    debut_date = datetime.strptime(data.get("mlbDebutDate"),"%Y-%m-%d")
                else:
                    debut_date = None
                if(data.get("lastPlayedDate") != None):
                    retire_date = datetime.strptime(data.get("lastPlayedDate"),"%Y-%m-%d")
                else:
                    retire_date = None
                hometown = data.get("birthCity")
                if(data.get("primaryNumber")!= None):
                    backnumber = data.get("primaryNumber")
                else:
                    backnumber = -1
                # 데이터베이스에 데이터 삽입
                cursor.execute('''
                    INSERT INTO `player` (player_id, name, is_playing, height, weight, main_position, main_hand, debut_date, retire_date, hometown, backnumber)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ''', (player_id, name, is_playing, height, weight, main_position, main_hand, debut_date, retire_date, hometown, backnumber))
                connection.commit()
                logger.info(f"데이터 삽입 성공: {filename}")
        except mysql.connector.IntegrityError as e :
            continue
        except Exception as e2:
            # 오류 발생 시 로그를 파일에 저장
            logger.error(f"{filename} 에러 발생: {str(e2)}")

# 연결 종료
cursor.close()
connection.close()
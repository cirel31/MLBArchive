# import logging
# import mysql.connector
# import json
from datetime import datetime
# from dotenv import load_dotenv
# import os
import logging
import mysql.connector
import json
import os
from dotenv import load_dotenv
# def setup_logger(logger_name, log_file):
#     logger = logging.getLogger(name=logger_name)
#     logger.setLevel(logging.INFO)
#     formatter = logging.Formatter('|%(asctime)s||%(name)s||%(levelname)s|\n%(message)s',
#                                   datefmt='%Y-%m-%d %H:%M:%S')

#     if logger.hasHandlers():
#         logger.handlers.clear()

#     file_handler = logging.FileHandler(log_file)
#     file_handler.setFormatter(formatter)
#     logger.addHandler(file_handler)

#     return logger

# # match_detail_id 초기값
# match_detail_id = 1

# def insert_math_detail(cursor, match_id, linescore, boxscore):
#     linescore_dump = json.dumps(linescore)
#     boxscore_dump = json.dumps(boxscore)
#     cursor.execute('''
#         INSERT INTO `match_detail` (match_detail_id, match_id,linescore, boxscore)
#         VALUES (%s, %s, %s, %s)
#     ''', (match_detail_id, match_id, linescore_dump, boxscore_dump))
#     connection.commit()

#     # 삽입된 match_detail_id를 사용하여 matches 테이블 업데이트
#     cursor.execute('''
#         UPDATE `matches` 
#         SET match_detail_id = %s 
#         WHERE match_id = %s
#     ''', (match_detail_id, match_id))
#     connection.commit()

# load_dotenv()
# db_user = os.getenv("DB_USER")
# db_password = os.getenv("DB_PASSWORD")
# db_host = os.getenv("DB_HOST")

# # MariaDB 연결 설정
# config = {
#     'user': db_user,
#     'password': db_password,
#     'host': db_host,
#     "port": 3306,
#     "database": "s09p22a301",  
# }

# # 연결 생성
# connection = mysql.connector.connect(**config)

# # 커서 생성
# cursor = connection.cursor()

# # 로그 설정
# log_file_path = 'logs/insert_match_detail.log'
# logger = setup_logger('insert_match_detail', log_file_path)

# try:
#     for year in range(1901, 1902):
#         linescore_path = "linescores_new/"+str(year)
#         boxscore_path = "boxscores/"+str(year)
#         for file_name in os.listdir(linescore_path):
#             file_path = os.path.join(linescore_path, file_name)

#             try:
#                 with open(file_path, "r") as file:
#                     linescore = json.load(file)
#                 game_id = linescore["game_id"]
#                 boxscore_file_path = boxscore_path+"/boxscore_"+str(game_id)+".json"

#                 with open(boxscore_file_path, "r") as bs:
#                     boxscore = json.load(bs)

#                 insert_math_detail(cursor, game_id, linescore, boxscore, match_detail_id)
#                 match_detail_id += 1
#                 logger.info(f"삽입성공: {file_path} {game_id}")
#             except Exception as e:
#                 error_message = f'오류 발생: {file_path} 에러 메시지: {str(e)}'
#                 logger.error(error_message)

# except Exception as e:
#     error_message = f'오류 발생: {str(e)}'
#     logger.error(error_message)

# finally:
#     # 연결 종료 (try 또는 except에서 오류가 발생하더라도 항상 실행)
#     cursor.close()
#     connection.close()

def setup_logger(logger_name, log_file):
    logger = logging.getLogger(name=logger_name)
    logger.setLevel(logging.INFO)
    formatter = logging.Formatter('|%(asctime)s||%(name)s||%(levelname)s|\n%(message)s',
                                  datefmt='%Y-%m-%d %H:%M:%S')

    if logger.hasHandlers():
        logger.handlers.clear()

    file_handler = logging.FileHandler(log_file)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    return logger

def check_exist_match_detail(cursor, match_detail_id):
    cursor.execute('''
        SELECT COUNT(*) 
        FROM `match_detail`
        WHERE match_detail_id = %s
    ''', (match_detail_id,))
    result = cursor.fetchone()
    return result[0] > 0

def insert_math_detail(cursor, match_id, linescore, boxscore, match_detail_id):
    linescore_dump = json.dumps(linescore)
    boxscore_dump = json.dumps(boxscore)
    cursor.execute('''
        INSERT INTO `match_detail` (match_detail_id, match_id, linescore, boxscore)
        VALUES (%s, %s, %s, %s)
    ''', (match_detail_id, match_id, linescore_dump, boxscore_dump))
    connection.commit()

def insert_or_update_match_detail(cursor, match_id, linescore, boxscore, match_detail_id):
    if not check_exist_match_detail(cursor, match_detail_id):
        # match_detail에 데이터 삽입
        insert_math_detail(cursor, match_id, linescore, boxscore, match_detail_id)

    # matches 테이블 업데이트
    cursor.execute('''
        UPDATE `matches` 
        SET match_detail_id = %s 
        WHERE match_id = %s
    ''', (match_detail_id, match_id))
    connection.commit()

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
log_directory_path = 'logs'
log_file_path = os.path.join(log_directory_path, 'insert_match_detail.log')

# 로그 디렉토리가 없으면 생성
if not os.path.exists(log_directory_path):
    os.makedirs(log_directory_path)

connection = mysql.connector.connect(**config)
cursor = connection.cursor()

log_file_path = 'logs/insert_match_detail.log'
logger = setup_logger('insert_match_detail', log_file_path)

match_detail_id = 1

try:
    for year in range(1903, 2024):
        linescore_path = "./linescores_new/" + str(year)
        boxscore_path = "./boxscores/" + str(year)
        
        for file_name in os.listdir(linescore_path):
            file_path = os.path.join(linescore_path, file_name)
            
            try:
                with open(file_path, "r") as file:
                    linescore = json.load(file)
                
                game_id = linescore["game_id"]
                boxscore_file_path = boxscore_path + "/boxscore_" + str(game_id) + ".json"

                with open(boxscore_file_path, "r") as bs:
                    boxscore = json.load(bs)

                insert_or_update_match_detail(cursor, game_id, linescore, boxscore, match_detail_id)
                match_detail_id += 1
                logger.info(f"삽입성공: {file_path} {game_id}")

            except Exception as e:
                error_message = f'오류 발생: {file_path} 에러 메시지: {str(e)}'
                logger.error(error_message)

except Exception as e:
    error_message = f'오류 발생: {str(e)}'
    logger.error(error_message)

finally:
    cursor.close()
    connection.close()

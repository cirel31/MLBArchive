import json
import mysql.connector
import os
import logging
from dotenv import load_dotenv
import re  # 정규식 사용을 위해 추가

def ensure_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def parse_float(value):
    try:
        return float(value)
    except ValueError:
        return 0

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

def insert_teamstat (year, logger, connection, cursor):
    file_path = f"teamstats/team_stat{year}.json"
    logger.info(f"started year: {year}")

    with open(f"{file_path}", "r") as f:
        total_info = json.load(f)
    try:
        for single_info in total_info:
            stats = single_info["stats"]
            team_id = stats[0]["splits"][0]["team"]["id"]
            season = -1
            batting_avg = -1
            win_percentage = -1
            win = -1
            lose = -1
            draw = -1
            era_avg = -1
            for stat in stats:
                split = stat["splits"][0]
                if stat["group"]["displayName"] == "hitting":
                    season = int(split["season"])
                    batting_avg = parse_float(split["stat"]["avg"])
                    # print(f"season : {season}")
                    # print(f"batting_avg: {batting_avg}")
                elif stat["group"]["displayName"] == "pitching":
                    win_percentage = parse_float(split["stat"]["winPercentage"])
                    win = split["stat"]["wins"]
                    lose = split["stat"]["losses"]
                    draw = split["stat"]["gamesPlayed"] - win - lose
                    era_avg = parse_float(split["stat"]["era"])
                    # print(f"win_percentage: {win_percentage}")
                    # print(f"era_avg: {era_avg}")
            division_rank = -1
            league_rank = -1
            
            
            
            
            connection.start_transaction()
            try:
                cursor.execute("""
                    INSERT INTO `TEAM_STAT` (team_id, season, win_percentage, win, lose, draw, batting_avg, era_avg, division_rank, league_rank)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)          
                """, (team_id, season, win_percentage, win, lose, draw, batting_avg, era_avg, division_rank, league_rank))    
                connection.commit()
                logger.info(f"데이터 삽입 성공: team_id={team_id}, season={season}")
            except Exception as e:
                logger.error(f"Error occurred: {str(e)} team_id:{team_id}")
                connection.rollback()  # 오류 발생 시 롤백
            finally:
                connection.autocommit = True    
    except Exception as e:
        logger.error(f"Error occurred: {str(e)} team_id:{team_id}")
        connection.rollback()  # 오류 발생 시 롤백

if __name__ == "__main__":
    load_dotenv()
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = int(os.getenv("DB_PORT"))

    connection = mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT,
        database="S09P22A301"
    )
    cursor = connection.cursor()

    try:
        for year in range(1902, 2024):
            logger = setup_logger(f"teamstat_insert_log_{year}", f'logs/insert_teamstat/{year}.log')
            insert_teamstat(year, logger, connection, cursor)
    finally:
        cursor.close()
        connection.close()

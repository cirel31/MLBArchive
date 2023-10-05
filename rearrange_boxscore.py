import json
import logging
import os
import shutil

def ensure_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

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

def rearrange_boxscore(folder_name, logger):
    for file_name in os.listdir(folder_name):
        file_path = os.path.join(folder_name, file_name)
        if os.path.isfile(file_path):
            try:
                # 파일 열기 예제 (여기서는 텍스트 파일을 열고 출력합니다)
                with open(file_path, 'r') as file:
                    boxscore = json.load(file)
                year = boxscore["boxscore"]["info"][-1]["label"][-4:]
                df = "boxscores/"+str(year)
                destination_path = os.path.join(df, file_name)
                ensure_directory(df)
                shutil.move(file_path, destination_path)
                logging.info(f"데이터 삽입 성공: {file_name}")
            except Exception as e:
                logger.error(f' 오류: {file_name}\n에러 메시지: {str(e)}\n')

logger = setup_logger("rearrange_boxscore","logs/rearrange_boxscore.log")

for idx in range(1,23):
    f_path = "boxscores/folder"+str(idx)
    rearrange_boxscore(f_path, logger)
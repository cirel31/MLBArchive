import statsapi
import json
import logging
from threading import Event

logger  =logging.getLogger(name="box_log")
logger.setLevel(logging.INFO)
formatter = logging.Formatter('|%(asctime)s||%(name)s||%(levelname)s|\n%(message)s',
                              datefmt='%Y-%m-%d %H:%M:%S'
                             )

if logger.hasHandlers(): ## 핸들러 존재 여부
    logger.handlers.clear() ## 핸들러 삭제

file_handler = logging.FileHandler('logs/boxscore.log') ## 파일 핸들러 생성
file_handler.setFormatter(formatter) ## 텍스트 포맷 설정
logger.addHandler(file_handler) ## 핸들러 등록

def boxscore_crawl(y):
    for year in range(y, y+1):
        match_ids = []
        with open(f"match_ids/match_ids{year}.json", "r") as f:
            match_ids = json.load(f)
        
        for match in match_ids:
            game_id = match["game_id"]
            try:
                boxscore = statsapi.get("game_boxscore", {"gamePk":game_id})
                input ={"game_id":game_id, "boxscore": boxscore}
                with open(f"boxscores/boxscore_{game_id}.json", "w") as f:
                    f.write(json.dumps(input))
                logger.info(f"{game_id} finished")
            except Exception as e:
                logger.error(f"Error for game_id {game_id}: {str(e)}")

for y in range(1980, 1984):
    logger.info(f"=====year:{y} started")
    boxscore_crawl(y)
    logger.info(f"=====year:{y} finished")
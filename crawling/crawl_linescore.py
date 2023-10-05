import statsapi
import json
import logging
import os

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

def get_game_info(game_id):
    try:
        game = statsapi.get("game", {"gamePk": game_id})
        game_date = game["gameData"]["datetime"]["officialDate"]
        linescore = game["liveData"]["linescore"]
        return game_id, game_date, linescore
    except Exception as e:
        return None, None, str(e)

def crawl_linescore(year, logger):
    year_directory = f'linescores_new/{year}'
    ensure_directory(year_directory)
    logger.info(f"=====year:{year} started")

    with open(f"match_ids/match_ids{year}.json", "r") as f:
        match_ids = json.load(f)
    
    for match in match_ids:
        game_id = match["game_id"]
        game_id, game_date, linescore = get_game_info(game_id)
        if game_id is not None:
            input = {"game_id": game_id, "game_date": game_date, "linescore": linescore}
            with open(f"linescores_new/{year}/linescore_{game_id}.json", "w") as f:
                f.write(json.dumps(input))
            logger.info(f"{game_id} finished")
        else:
            logger.error(f"Error in {game_id}")

    logger.info(f"=====year:{year} finished")

if __name__ == "__main__":
    for year in range(2010, 2024):
        logger = setup_logger(f"linescore_log_{year}", f'logs/crawl_linescores/linescore_{year}.log')
        crawl_linescore(year, logger)
import requests
import json
import os

# JSON 파일 열기
with open('all_players.json', 'r') as f:
    players = json.load(f)

# 이미지 저장 폴더 생성 (이미 폴더가 있으면 건너뛰기)
if not os.path.exists('player_images'):
    os.makedirs('player_images')


# 각 선수의 이미지 다운로드 및 저장
for player in (players):
    print((player))
    try:
        img_url = f"https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/{player['id']}/headshot/67/current"
        response = requests.get(img_url)

        if response.status_code == 200:  # HTTP 응답이 "200 OK"인 경우에만 이미지 저장
            with open(f"player_images/image_{player['id']}.png", "wb") as f:
                f.write(response.content)
    except Exception as e:
        with open("logs/img_error.log", "a") as log:
            log.write(f"Error at Player ID: {player['id']}, Player Name: {player['fullName']}. Error Message: {str(e)}\n")
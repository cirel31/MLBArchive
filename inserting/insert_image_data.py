import json
import mysql.connector
from mysql.connector import Error

# DB 정보
DB_USER = 'S09P22A301@stg-yswa-kr-practice-db-master.mariadb.database.azure.com'
DB_PASSWORD = 'QmK0nwCJzS'
DB_HOST = 'stg-yswa-kr-practice-db-master.mariadb.database.azure.com'
DB_PORT = 3306
DB_NAME = 'S09P22A301'  # 사용 중인 데이터베이스 이름을 입력하세요

# JSON 파일에서 데이터를 불러옵니다
with open('s3_image_urls.json', 'r') as file:
    image_data = json.load(file)

try:
    connection = mysql.connector.connect(host=DB_HOST,
                                         port=DB_PORT,
                                         user=DB_USER,
                                         password=DB_PASSWORD,
                                         database=DB_NAME)

    if connection.is_connected():
        cursor = connection.cursor()

        for player_id, image_url in image_data.items():
            update_query = f"UPDATE Player SET image = '{image_url}' WHERE player_id = {player_id}"
            cursor.execute(update_query)
            connection.commit()

        print(f"Updated {cursor.rowcount} rows")

except Error as e:
    print(f"Error: {e}")

finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("Connection is closed.")

import boto3
import os
import json
import logging

# 로그 설정
logging.basicConfig(filename="s3_upload.log", level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')
console = logging.StreamHandler()
console.setLevel(logging.INFO)
logging.getLogger().addHandler(console)

# AWS credentials와 설정
AWS_ACCESS_KEY = 'AKIAWEYQVFMPLZ45LNXQ'
AWS_SECRET_KEY = '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'
REGION_NAME = 'ap-northeast-2'
BUCKET_NAME = '505bucket'

# boto3 client 생성
s3 = boto3.client('s3', region_name=REGION_NAME, aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY)

# 이미지 파일의 디렉토리 경로
IMAGE_DIRECTORY = '../player_images'

# 결과를 저장할 dictionary
result = {}

# 이미지 파일들을 S3에 업로드
for file_name in os.listdir(IMAGE_DIRECTORY):
    if file_name.endswith(".png"):
        file_path = os.path.join(IMAGE_DIRECTORY, file_name)
        
        try:
            # S3에 파일 업로드
            s3.upload_file(file_path, BUCKET_NAME, file_name)

            # S3 URL 생성
            url = f"https://{BUCKET_NAME}.s3.{REGION_NAME}.amazonaws.com/players/{file_name}"
            
            # player_id 추출
            player_id = file_name.split("_")[1].split(".")[0]
            
            # 결과 dictionary에 추가
            result[player_id] = url
            
            logging.info(f"Successfully uploaded {file_name} to S3 and saved its URL.")

        except Exception as e:
            logging.error(f"Failed to upload {file_name} to S3. Error: {e}")
            continue

# 결과를 JSON 파일로 저장
with open("s3_image_urls.json", "w") as outfile:
    json.dump(result, outfile)

logging.info("All operations completed.")
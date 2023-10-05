#!/bin/bash

# 가상 환경 활성화 (가상 환경 디렉토리 경로를 적절하게 수정)
source /home/ubuntu/data_collecting/data/data-env/bin/activate

# Python 스크립트 실행 (실행할 스크립트 파일 경로를 적절하게 수정)
python /home/ubuntu/data_collecting/data/update_match_schedule.py

echo "$(date): sh executed" >> "./update_log.log"

# 가상 환경 비활성화
deactivate


# 포팅 메뉴얼

# Version

## backend server

| Name | Version |
| --- | --- |
| JAVA | 17 |
| SpringBoot | 3.1.3 |
| querydsl-jpa | 5.0.0 |
| Gradle | 8.0 |

## frontend server

| Name | Version |
| --- | --- |
| Node.js | 18.17.0 |
| Next.js | 13.4.19 |
| React | 18.2.0 |
| TypeScript | 5.2.2 |

## DB

| Name | Version |
| --- | --- |
| MariaDB | 11.1.2 |

## ETC

| Name | Version |
| --- | --- |
| Docker | 24.0.6 |
| Intellij | latest |
| VS Code | latest |

---

# 외부 API

1. Google 로그인 API
2. Kakao 로그인 API
3. Naver 로그인 API

---

# Settings

## DB

```bash
cd /exec/A301

maridadb -u root -p dreamtherock;
create database s09p22a301;
exit;

mysql -u root -p dreamtherock s09p22a301 < s09p22a301_fielding_seq.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_fielding.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_hitting_seq.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_hitting.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_matches.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_pitching_seq.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_pitching.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_player_like_seq.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_player_like.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_player.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_season_roster.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_team_like_seq.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_team_like.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_team_stat_seq.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_team_stat.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_team.sql
mysql -u root -p dreamtherock s09p22a301 < s09p22a301_users.sql

```

## Cron

```bash
crontab -e
1

*/5 * * * * /bin/bash /home/ubuntu/data_collecting/data/update_match_schedule.sh
```

## Backend

```bash
cd /backend/ssafyBigswing
chmod +x ./gradlew
./gradlew clean build

java -jar ./build/libs/ssafyBigswing-0.0.1-SNAPSHOT.jar
```

## Frontend

```bash
cd /frontend
npm i
npm run build

# 개발자 모드 실행
npm run dev

# 서비스 실행
npm run start
```

## 환경 변수

```bash
# API KEY & SECRETE KEY
ENV NEXT_PUBLIC_NAVER_CLIENT_ID
ENV NEXT_PUBLIC_NAVER_CLIENT_SECRET

ENV NEXT_PUBLIC_KAKAO_CLIENT_ID
ENV NEXT_PUBLIC_KAKAO_CLIENT_SECRET

ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_GOOGLE_CLIENT_SECRET

# URL Lists

# BASE
ENV NEXT_PUBLIC_CLIENT_BASE_URL [frontend url 집어넣기]
ENV NEXT_PUBLIC_SERVER_BASE_URL [backend url 집어넣기]
# OAUTH FRONT
ENV NEXT_PUBLIC_OAUTH_KAKAO_URL /oauth/kakao
ENV NEXT_PUBLIC_OAUTH_NAVER_URL /oauth/naver
ENV NEXT_PUBLIC_OAUTH_GOOGLE_URL /oauth/google
# OAUTH BACK
ENV NEXT_PUBLIC_OAUTH_SERVER_URL /api/auth/login/
ENV NEXT_PUBLIC_OAUTH_KAKAO_SERVER_URL /api/auth/login/kakao
ENV NEXT_PUBLIC_OAUTH_NAVER_SERVER_URL /api/auth/login/naver
ENV NEXT_PUBLIC_OAUTH_GOOGLE_SERVER_URL /api/auth/login/google
# USER
ENV NEXT_PUBLIC_SERVER_LOGIN_URL /login
ENV NEXT_PUBLIC_SERVER_LOGOUT_URL /logout
# SEARCH
ENV NEXT_PUBLIC_SERVER_SEARCH_URL /search
```

---

# CI-CD

1. master branch에 변화 감지 시 build, check_container, deploy실행
2. develop branch에 변화 감지 시 build만 실행

```yaml
stages:
  - build
  - check_container
  - deploy

backend-build:
  stage: build
  only:
    - develop
    - master

  before_script:
    - echo 'backend build starts'
    - cd ./backend/ssafyBigswing/
    - chmod +x ./gradlew
  script:
    - ./gradlew clean build
    - docker build -t springboot . # Docker 이미지 빌드
  artifacts:
    name: "springboot"
    paths:
      - ./backend/ssafyBigswing/build/libs/*.jar
  tags:
    - ssafy

frontend-build:
  stage: build
  only:
    - develop
    - master

  before_script:
    - echo 'frontend build starts'
    - cd ./frontend
  script:
    - docker build -t nextjs -f ./Dockerfile . # Docker 이미지 빌드

  # artifacts:
  #   name: "nextjs"
  #   paths:
  #     - ./frontend/.next/

  tags:
    - ssafy

backend-check-container:
  stage: check_container
  only:
    - master

  script:
    - |
      if docker ps -a --format '{{.Names}}' | grep -q "nextjs-app"; then
        echo "The 'nextjs-app' container already exists."
        docker stop nextjs-app  # 컨테이너 중지
        docker rm nextjs-app    # 컨테이너 삭제
      fi
  tags:
    - ssafy

frontend-check-container:
  stage: check_container
  only:
    - master
  script:
    - |
      if docker ps -a --format '{{.Names}}' | grep -q "springboot-app"; then
        echo "The 'springboot-app' container already exists."
        docker stop springboot-app  # 컨테이너 중지
        docker rm springboot-app    # 컨테이너 삭제
      fi
  tags:
    - ssafy

backend-deploy:
  stage: deploy
  only:
    - master
  before_script:
    - echo 'backend deploy starts'

  script:
    - docker run -d -p 8080:8080 --name springboot-app springboot # Docker 컨테이너 실행
  tags:
    - ssafy

frontend-deploy:
  stage: deploy
  only:
    - master
  before_script:
    - echo "frontend deploy start"
  script:
    - sudo docker run -d -p 3000:3000 --name nextjs-app nextjs # Docker 컨테이너 실행
  tags:
    - ssafy
```

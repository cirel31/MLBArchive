
FROM azul/zulu-openjdk:17

# 작업 디렉토리 설정
WORKDIR /app

# JAR 파일을 컨테이너로 복사
COPY build/libs/ssafyBigswing-0.0.1-SNAPSHOT.jar /app/ssafy.jar

# 포트 설정
EXPOSE 8080

# 애플리케이션 실행
CMD ["java", "-jar", "ssafy.jar"]
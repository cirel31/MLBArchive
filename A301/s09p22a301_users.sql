CREATE DATABASE  IF NOT EXISTS `s09p22a301` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;
USE `s09p22a301`;
-- MySQL dump 10.17  Distrib 10.3.23-MariaDB, for Win64 (AMD64)
--
-- Host: stg-yswa-kr-practice-db-master.mariadb.database.azure.com    Database: s09p22a301
-- ------------------------------------------------------
-- Server version	5.6.47.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `signup_date` date DEFAULT NULL,
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `profile_image` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `refresh_token` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `social_type` enum('GOOGLE','KAKAO','NAVER') COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2023-09-25',1,'cirel31@gmail.com','도현','https://505bucket.s3.ap-northeast-2.amazonaws.com/basic_psa.jpg',NULL,'KAKAO'),('2023-09-25',2,'rkdmf0914@naver.com','채가을','https://505bucket.s3.ap-northeast-2.amazonaws.com/basic_psa.jpg','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwIiwiaWF0IjoxNjk1NjI0MTk5LCJleHAiOjE2OTYyMjg5OTl9.pX7N_I__oo3MhSVvwkCmW2pqHS4MFT1smJR8am8VnaY','KAKAO'),('2023-09-26',3,'kanghee96@gmail.com','이강희','https://505bucket.s3.ap-northeast-2.amazonaws.com/basic_psa.jpg','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwIiwiaWF0IjoxNjk1NjkxOTUyLCJleHAiOjE2OTYyOTY3NTJ9.qUEdHiOvzsLFSj2FnOHDga0qTAMrwhSCkzkMRoQ5q3M','KAKAO');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-26 17:30:00

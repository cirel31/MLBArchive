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
-- Table structure for table `team_like`
--

DROP TABLE IF EXISTS `team_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_like` (
  `liked_date` date DEFAULT NULL,
  `team_id` bigint(20) DEFAULT NULL,
  `teamlike_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`teamlike_id`),
  KEY `FK962x8xnr30qe93bjmag3nbgf0` (`team_id`),
  KEY `FK9ikosor5p5ikr7e0frbq94xgu` (`user_id`),
  CONSTRAINT `FK962x8xnr30qe93bjmag3nbgf0` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`),
  CONSTRAINT `FK9ikosor5p5ikr7e0frbq94xgu` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_like`
--

LOCK TABLES `team_like` WRITE;
/*!40000 ALTER TABLE `team_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_like` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-26 16:10:01

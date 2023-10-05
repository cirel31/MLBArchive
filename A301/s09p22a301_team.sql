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
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `team_id` bigint(20) NOT NULL,
  `created_year` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `kor_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `team_location` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `team_logo` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `team_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (108,'1961-01-01 00:00:00',NULL,'Anaheim','','Los Angeles Angels',NULL),(109,'1996-01-01 00:00:00',NULL,'Phoenix','','Arizona Diamondbacks',NULL),(110,'1901-01-01 00:00:00',NULL,'Baltimore','','Baltimore Orioles',NULL),(111,'1901-01-01 00:00:00',NULL,'Boston','','Boston Red Sox',NULL),(112,'1874-01-01 00:00:00',NULL,'Chicago','','Chicago Cubs',NULL),(113,'1882-01-01 00:00:00',NULL,'Cincinnati','','Cincinnati Reds',NULL),(114,'1901-01-01 00:00:00',NULL,'Cleveland','','Cleveland Guardians',NULL),(115,'1992-01-01 00:00:00',NULL,'Denver','','Colorado Rockies',NULL),(116,'1901-01-01 00:00:00',NULL,'Detroit','','Detroit Tigers',NULL),(117,'1962-01-01 00:00:00',NULL,'Houston','','Houston Astros',NULL),(118,'1968-01-01 00:00:00',NULL,'Kansas City','','Kansas City Royals',NULL),(119,'1884-01-01 00:00:00',NULL,'Los Angeles','','Los Angeles Dodgers',NULL),(120,'1968-01-01 00:00:00',NULL,'Washington','','Washington Nationals',NULL),(121,'1962-01-01 00:00:00',NULL,'Flushing','','New York Mets',NULL),(128,'1914-01-01 00:00:00',NULL,'United States','','Kansas City Packers',NULL),(133,'1901-01-01 00:00:00',NULL,'Oakland','','Oakland Athletics',NULL),(134,'1882-01-01 00:00:00',NULL,'Pittsburgh','','Pittsburgh Pirates',NULL),(135,'1968-01-01 00:00:00',NULL,'San Diego','','San Diego Padres',NULL),(136,'1977-01-01 00:00:00',NULL,'Seattle','','Seattle Mariners',NULL),(137,'1883-01-01 00:00:00',NULL,'San Francisco','','San Francisco Giants',NULL),(138,'1892-01-01 00:00:00',NULL,'St. Louis','','St. Louis Cardinals',NULL),(139,'1996-01-01 00:00:00',NULL,'St. Petersburg','','Tampa Bay Rays',NULL),(140,'1961-01-01 00:00:00',NULL,'Arlington','','Texas Rangers',NULL),(141,'1977-01-01 00:00:00',NULL,'Toronto','','Toronto Blue Jays',NULL),(142,'1901-01-01 00:00:00',NULL,'Minneapolis','','Minnesota Twins',NULL),(143,'1883-01-01 00:00:00',NULL,'Philadelphia','','Philadelphia Phillies',NULL),(144,'1871-01-01 00:00:00',NULL,'Atlanta','','Atlanta Braves',NULL),(145,'1901-01-01 00:00:00',NULL,'Chicago','','Chicago White Sox',NULL),(146,'1991-01-01 00:00:00',NULL,'Miami','','Miami Marlins',NULL),(147,'1903-01-01 00:00:00',NULL,'Bronx','','New York Yankees',NULL),(153,'1914-01-01 00:00:00',NULL,'United States','','Newark Peppers',NULL),(158,'1968-01-01 00:00:00',NULL,'Milwaukee','','Milwaukee Brewers',NULL),(165,'1914-01-01 00:00:00',NULL,'United States','','Baltimore Terrapins',NULL),(176,'1914-01-01 00:00:00',NULL,'United States','','Pittsburgh Rebels',NULL),(185,'1914-01-01 00:00:00',NULL,'United States','','Brooklyn Feds',NULL),(189,'1914-01-01 00:00:00',NULL,'United States','','Buffalo Feds',NULL),(191,'1914-01-01 00:00:00',NULL,'United States','','Chicago Whales',NULL),(197,'1914-01-01 00:00:00',NULL,'United States','','St. Louis Terriers',NULL),(298,'1901-01-01 00:00:00',NULL,'Baltimore','','Baltimore Orioles',NULL);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-26 16:10:03

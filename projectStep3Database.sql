-- MariaDB dump 10.19  Distrib 10.5.22-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_lude
-- ------------------------------------------------------
-- Server version	10.6.16-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;
--
-- Table structure for table `Movies`
--

DROP TABLE IF EXISTS `Movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Movies` (
  `Movie_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Run_Time` float(4,1) NOT NULL,
  `URLs` varchar(50) NOT NULL,
  PRIMARY KEY (`Movie_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Movies`
--

LOCK TABLES `Movies` WRITE;
/*!40000 ALTER TABLE `Movies` DISABLE KEYS */;
INSERT INTO `Movies` VALUES (100,'Barbie',114.0,'Watch Barbie | Now Streaming | Max'),(101,'Rustin',108.0,'Watch Rustin | Netflix Official Site'),(102,'Strays',94.0,'Watch Strays(2023) | Prime Video (amazon.com)'),(103,'Avenger: Endgame',182.0,'Watch Marvel Studios\' Avengers: Endgame | Disney +');
/*!40000 ALTER TABLE `Movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Platform_Movies`
--

DROP TABLE IF EXISTS `Platform_Movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Platform_Movies` (
  `Movie_ID` int(11) DEFAULT NULL,
  `Platform_ID` int(11) DEFAULT NULL,
  KEY `Movie_ID` (`Movie_ID`),
  KEY `Platform_ID` (`Platform_ID`),
  CONSTRAINT `Platform_Movies_ibfk_1` FOREIGN KEY (`Movie_ID`) REFERENCES `Movies` (`Movie_ID`),
  CONSTRAINT `Platform_Movies_ibfk_2` FOREIGN KEY (`Platform_ID`) REFERENCES `Platforms` (`Platform_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Platform_Movies`
--

LOCK TABLES `Platform_Movies` WRITE;
/*!40000 ALTER TABLE `Platform_Movies` DISABLE KEYS */;
INSERT INTO `Platform_Movies` VALUES (102,10002),(101,10000),(100,10001),(103,10003);
/*!40000 ALTER TABLE `Platform_Movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Platform_Series`
--

DROP TABLE IF EXISTS `Platform_Series`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Platform_Series` (
  `Series_ID` int(11) DEFAULT NULL,
  `Platform_ID` int(11) DEFAULT NULL,
  KEY `Series_ID` (`Series_ID`),
  KEY `Platform_ID` (`Platform_ID`),
  CONSTRAINT `Platform_Series_ibfk_1` FOREIGN KEY (`Series_ID`) REFERENCES `Series` (`Series_ID`),
  CONSTRAINT `Platform_Series_ibfk_2` FOREIGN KEY (`Platform_ID`) REFERENCES `Platforms` (`Platform_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Platform_Series`
--

LOCK TABLES `Platform_Series` WRITE;
/*!40000 ALTER TABLE `Platform_Series` DISABLE KEYS */;
INSERT INTO `Platform_Series` VALUES (101,10002),(100,10000),(102,10001),(103,10003);
/*!40000 ALTER TABLE `Platform_Series` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Platforms`
--

DROP TABLE IF EXISTS `Platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Platforms` (
  `Platform_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Website` varchar(50) NOT NULL,
  `Price` int(11) DEFAULT NULL,
  PRIMARY KEY (`Platform_ID`),
  KEY `Price` (`Price`),
  CONSTRAINT `Platforms_ibfk_1` FOREIGN KEY (`Price`) REFERENCES `Prices` (`Price_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10004 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Platforms`
--

LOCK TABLES `Platforms` WRITE;
/*!40000 ALTER TABLE `Platforms` DISABLE KEYS */;
INSERT INTO `Platforms` VALUES (10000,'Netflix','Netflix-Watch TV Shows Online',101),(10001,'Max','Max | The One to Watch',100),(10002,'Amazon Prime Video','Prime Video | Watch movies, TV shows, Live TV, and',102),(10003,'Disney +','Stream Disney, Pixar, Marvel, Star Wars, Nat Geo |',103);
/*!40000 ALTER TABLE `Platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Prices`
--

DROP TABLE IF EXISTS `Prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Prices` (
  `Price_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Price` float(4,2) NOT NULL,
  `Has_Ads` tinyint(1) NOT NULL,
  PRIMARY KEY (`Price_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Prices`
--

LOCK TABLES `Prices` WRITE;
/*!40000 ALTER TABLE `Prices` DISABLE KEYS */;
INSERT INTO `Prices` VALUES (100,15.49,0),(101,15.99,0),(102,8.99,0),(103,13.99,0);
/*!40000 ALTER TABLE `Prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Series`
--

DROP TABLE IF EXISTS `Series`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Series` (
  `Series_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Episode_Count` int(11) NOT NULL,
  `Season_Count` int(11) NOT NULL,
  `URLs` varchar(50) NOT NULL,
  PRIMARY KEY (`Series_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Series`
--

LOCK TABLES `Series` WRITE;
/*!40000 ALTER TABLE `Series` DISABLE KEYS */;
INSERT INTO `Series` VALUES (100,'Cyberpunk: Edgerunner',10,1,'Watch Cyberpunk: Edgerunners | Netflix Official Si'),(101,'The Boys',24,3,'Watch The Boys - Season 4 | Prime Video (amazon.co'),(102,'The Last Of Us',9,1,'Watch The Last of Us (HBO) | Max'),(103,'Marvel\'s Jessica Jones',39,3,'Watch Jessica Jones | Disney + (disneyplus.com');
/*!40000 ALTER TABLE `Series` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-08 14:34:01

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
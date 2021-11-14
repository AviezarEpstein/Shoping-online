CREATE DATABASE  IF NOT EXISTS `shop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shop`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: shop
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_id` bigint DEFAULT NULL,
  `creation_date` varchar(45) DEFAULT NULL,
  `is_active` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1,'2021-07-07','false','canceled'),(2,1,'2021-08-08','true','Ordered'),(3,2,'2021-07-08','false','ordered'),(4,2,'2021-08-07','true','Ordered'),(17,1,'1636310540766',NULL,'Ordered'),(18,1,'1636311924715',NULL,'Ordered'),(19,1,'1636314476847',NULL,'Ordered'),(20,1,'1636314555538',NULL,'Ordered'),(21,1,'1636316709220',NULL,'Ordered'),(22,1,'1636317025095',NULL,'Ordered'),(23,1,'1636360698173',NULL,'Ordered'),(24,1,'1636360884585',NULL,'Ordered'),(25,1,'1636405022613',NULL,'pending'),(26,4,'1636483808664',NULL,'Ordered'),(27,4,'1636556873315',NULL,'Ordered'),(28,4,'1636557131969',NULL,'Ordered'),(29,4,'1636557418485',NULL,'Ordered'),(31,4,'1636573123882',NULL,'Ordered'),(32,4,'1636628340494',NULL,'Ordered'),(33,4,'1636629035933',NULL,'Ordered'),(34,4,'1636630586477',NULL,'Ordered'),(40,4,'1636681344936',NULL,'pending'),(42,6,'1636821322813',NULL,'pending'),(43,8,'1636822432714',NULL,'Ordered'),(45,8,'1636835724982',NULL,'Ordered'),(46,8,'1636838440040',NULL,'pending');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_details`
--

DROP TABLE IF EXISTS `cart_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `cart_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=266 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_details`
--

LOCK TABLES `cart_details` WRITE;
/*!40000 ALTER TABLE `cart_details` DISABLE KEYS */;
INSERT INTO `cart_details` VALUES (122,1,1,5,2),(123,2,3,15,2),(124,10,11,33,2),(125,7,3,9,2),(126,1,1,5,7),(127,2,3,15,7),(132,1,1,5,4),(133,4,2,8,4),(134,8,2,6,4),(135,2,3,15,8),(136,3,46,138,8),(137,1,1,5,9),(138,4,2,8,9),(139,1,1,5,10),(140,2,3,15,10),(141,4,2,8,10),(142,3,46,138,11),(143,4,2,8,11),(144,2,3,15,12),(145,1,1,5,12),(146,4,2,8,12),(147,8,2,6,12),(148,10,2,6,12),(149,13,2,8,12),(151,3,46,138,14),(152,4,2,8,14),(153,5,4,16,14),(165,1,1,5,13),(166,6,2,8,13),(167,1,1,5,15),(168,2,3,15,16),(169,6,2,8,16),(170,5,4,16,16),(171,1,1,5,17),(172,2,3,15,17),(174,1,1,5,18),(175,3,46,138,18),(176,5,4,16,18),(177,2,3,15,19),(178,3,46,138,20),(179,2,3,15,21),(180,5,4,16,21),(181,4,2,8,21),(182,3,46,138,22),(183,2,3,15,22),(184,1,1,5,23),(186,1,1,5,24),(187,1,1,5,25),(196,1,1,5,26),(197,2,3,15,26),(198,3,46,138,26),(199,7,2,6,26),(200,2,3,15,27),(201,2,3,15,28),(202,5,3,12,29),(203,4,2,8,29),(207,1,1,5,31),(208,2,3,15,31),(209,1,2,10,32),(210,2,3,15,33),(211,3,46,138,34),(242,3,46,138,40),(243,5,4,16,40),(244,6,2,8,40),(245,13,1,4,40),(246,12,2,10,40),(252,3,46,138,42),(254,4,2,8,43),(256,9,1,4,43),(257,8,1,3,43),(258,10,1,3,43),(259,7,2,6,43),(262,3,46,138,45),(263,7,1,3,45),(264,2,1,4,45),(265,2,1,4,46);
/*!40000 ALTER TABLE `cart_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Milk & Yogurts','Milk & Yogurts'),(2,'Vegetables & Fruits','Vegetables & Fruits'),(3,'Drinks','Drinks'),(4,'Home Accessories','Home Accessories'),(5,'Sauces','Sauces');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img1` varchar(450) DEFAULT NULL,
  `img2` varchar(450) DEFAULT NULL,
  `img3` varchar(450) DEFAULT NULL,
  `img4` varchar(450) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `customer_id` bigint DEFAULT NULL,
  `order_date` varchar(45) DEFAULT NULL,
  `shipped_date` varchar(45) DEFAULT NULL,
  `ship_city` varchar(200) DEFAULT NULL,
  `tracking_number` bigint DEFAULT NULL,
  `cart_id` bigint DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `foor_last_cc_digits` int DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `zip` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `personal_id` varchar(45) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'2021-07-07','2021-07-07','Tel Aviv',1000,1,24,'Ben Gurion',2245,NULL,NULL,NULL,NULL,NULL,NULL),(2,1,'2021-08-08','2021-08-08','Tel Aviv',1001,2,24,'Ben Gurion',2245,NULL,NULL,NULL,NULL,NULL,NULL),(3,2,'2021-07-08','2021-07-08','Petah Tikva',1002,3,31,'Rotchild',4512,NULL,NULL,NULL,NULL,NULL,NULL),(4,2,'2021-08-07','2021-08-07','Petah Tikva',1003,4,3,'Rotchild',4512,NULL,NULL,NULL,NULL,NULL,NULL),(45,1,'1636310754651',NULL,'sdf',NULL,0,7,'FFFF',5252,NULL,'12345','aviepi200@gmail.com',NULL,'avi','epi'),(46,1,'1636311863617',NULL,'SSS',NULL,17,7,'FFFF',5252,NULL,'12345','aviepi200@gmail.com',NULL,'gh','fsdg'),(47,1,'1636311957323',NULL,'SSS',NULL,0,4,'FFFF',5252,NULL,'12345','aviepi200@gmail.com',NULL,'gfhd','dgf'),(48,1,'1636314455767',NULL,'SSS',NULL,18,27,'FFFF',5252,NULL,'12345','aviepi200@gmail.com',NULL,'gh','fy'),(49,1,'1636314500514',NULL,'SSS',NULL,0,10,'FFFF',5252,NULL,'12345','aviepi200@gmail.com',NULL,'ghk','ghjk'),(50,1,'1636314573553',NULL,'fhjk',NULL,0,6,'fhjk',5252,NULL,'fhj','hj',NULL,'hjk','fhjk'),(51,1,'1636316700629',NULL,'dg',NULL,20,6,'FFFF',2222,NULL,'12345','aviepi200@gmail.com',NULL,'fd','gf'),(52,1,'1636317015051',NULL,'SSS',NULL,21,18,'FFFF',2222,NULL,'12345','aviepi200@gmail.com',NULL,'wret','wer'),(53,1,'1636317047570',NULL,'rty',NULL,22,5,'rtyr',2222,NULL,'rty','rty',NULL,'rty','ryt'),(54,1,'1636360728500',NULL,'SSS',NULL,23,5,'FFFF',2222,NULL,'12345','aviepi200@gmail.com',NULL,'asdf','dsa'),(55,1,'1636368858900',NULL,'SSS',NULL,24,10,'FFFF',2222,NULL,'12345','aviepi200@gmail.com',NULL,'fd','fds'),(56,4,'1636547992868',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(57,4,'1636548108954',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(58,4,'1636548124053',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(59,4,'1636548181674',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(60,4,'1636548277993',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(61,4,'1636548377503',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(62,4,'1636548497671',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(63,4,'1636548687601',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(64,4,'1636550078627',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(65,4,'1636550173238',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(66,4,'1636550210231',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(67,4,'1636550245477',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(68,4,'1636550432921',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(69,4,'1636550495509',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(70,4,'1636550580860',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(71,4,'1636550877805',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(72,4,'1636550899359',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(73,4,'1636551005334',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(74,4,'1636551169385',NULL,'Petach-Ticva',NULL,26,84,'Some address',5252,NULL,'123542','aviepi200@gmail.com',NULL,'Aviezer','Epstein'),(75,4,'1636556938860',NULL,'ddd',NULL,27,62,'FFFF',5252,NULL,'12345','aviepi200@gmail.com',NULL,'ddd','ddd'),(76,4,'1636557194653',NULL,'ssss',NULL,28,18,'sss',2222,NULL,'sssss','aviepi200@gmail.com',NULL,'ssssss','sssssssss'),(77,4,'1636557448970',NULL,'SSS',NULL,29,16,'FFFF',2222,NULL,'12345','aviepi200@gmail.com',NULL,'gggggg','ggggg'),(78,4,'1636627907129','','fffff',NULL,31,0,'fffffffff',9084,NULL,'12345','rtest@gmail.com',NULL,'ffffff','fffffff'),(79,4,'1636628582600','1636628582600','fffff',NULL,32,10,'ddddd',9084,NULL,'12345','rtest@gmail.com',NULL,'ffffff','fffffff'),(80,4,'1636630095793','1636630095793','fffff',NULL,33,0,'ffffff',9084,NULL,'12345','rtest@gmail.com',NULL,'ffffff','fffffff'),(81,4,'1636658529538','1636658529538','fffff',NULL,34,0,'Some Address',9084,NULL,'12345','rtest@gmail.com',NULL,'ffffff','fffffff'),(82,8,'1636834920076','1636834920076','sg',NULL,43,24,'sfdgs',9084,NULL,'456sfd','avi@gmail.com',NULL,'dgf','fg'),(83,8,'1636838355988','1636838355988','dh',NULL,45,0,'gftdffffff',7047,NULL,'ghgfh','avigail@gmail.com',NULL,'safdf','gfhff');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` bigint NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `unit_price` int DEFAULT NULL,
  `units_in_stock` int DEFAULT NULL,
  `main_image` varchar(450) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `quantity_per_unit` bigint DEFAULT NULL,
  `weight_type` varchar(45) DEFAULT NULL,
  `weight` int DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Tnuva-Milk',1,5,47,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/AAL20_L_P_4131074_1.png','Some description','Tnuva',1,'ml',750),(2,'Potato',2,4,287,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/BMY14_L_P_1715_1.png','Some description','Gush Katif',1,'gram',1000),(3,'Tomato',2,3,19,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/CTV50_L_P_7296073440314_1.png','Some description','Gush Katif',1,'gram',1000),(4,'Coca-cola',3,4,192,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/LAT16_L_P_3119110_1.png','Some description','Tempo',6,'ml',1500),(5,'Sprite',3,4,197,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/XDT38_L_P_7290110110628_1.png','Some description','Tempo',6,'ml',1500),(6,'Pepsi',3,4,200,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/PMJ22_L_P_327532_1.png','Some description','Pepsi',6,'ml',1500),(7,'Pepsi max',3,3,193,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/MHP46_L_P_5896972_1.png','Some description','Pepsi',6,'ml',1500),(8,'Sano - Toilet paper',4,3,499,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/LTW44_L_P_7290012116735_1.png','Some description','Sano',22,'gram',3000),(9,'Sano - napkins',4,4,499,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/PWY34_L_P_5424847_1.png','Some description','Sano',2,'gram',2000),(10,'Tnuva - Yogurt ',1,3,394,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/FMJ18_L_P_57132_1.png','Some description','Tnuva',1,'ml',250),(11,'Tnuva - Butter',1,2,400,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/TTX56_L_P_7290014758544_1.png','Some description','Tnuva',1,'gram',250),(12,'Orange',2,5,400,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/VTL32_L_P_964508_1.png','Some description','Gush Katif',1,'gram',1000),(13,'Bannana',2,4,400,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/XQB36_L_P_965772_1.png','Some description','Gush Katif',1,'gram',1000),(14,'Olive oil',5,6,400,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/YSP26_L_P_3427154_1.png','Some description','Mia',1,'ml',750),(15,'Kanola oil',5,3,400,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/BTH26_L_P_2374640_1.png','Some description','Mia',1,'ml',750),(16,'Vinegar',5,3,400,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/QGJ56_L_P_7296073291244_1.png','Some description','Mia',1,'ml',500),(17,'The Thousand Islands',5,4,400,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/GWD48_L_P_7290112964502_1.png','Some description','Osem',1,'ml',500),(18,'Chili sauce',5,4,400,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/TZO50_L_P_7290112358219_1.png','Some description','Osem',1,'ml',500),(19,'Mustard',5,4,400,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/HKL20_L_P_3450602_1.png','Some description','Osem',1,'ml',500),(20,'Ketchup',5,4,400,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/CKL18_L_P_72630_1.png','Some description','Osem',1,'ml',500),(22,'Onion',2,3,5555,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/RLM12_L_P_480_1.png','Description Description Description Description Description Description ','Gush katif',1,'kg',1),(23,'Onion',2,4,5555,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/AMV10_L_P_1036_1.png','Some description Some description ','Gush katif',1,'kg',2),(24,'Sprite - 6 Pack',3,4,197,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/XDT38_L_P_7290110110628_1.png','Some description','Tempo',6,'ml',1500),(25,'Milk In Bag',1,3,900,'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/product_images/products_large/JCY12_L_P_42015_1.png','Milk In Bag - 1 Liter - Tnuva','Tnuva',1,'Liter',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `user_type` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  `personal_id` varchar(10) DEFAULT NULL,
  `zip` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'admin@gmail.com','766342084f4872910acc23a16dcf14c1','admin','admin','Admin','Raanana','Ben Gurion',NULL,'12345'),(4,'rtest@gmail.com','766342084f4872910acc23a16dcf14c1','ffffff','fffffff','Customer','fffff','fffffff','304918329','12345'),(6,'chaya@gmail.com','766342084f4872910acc23a16dcf14c1','Chaya','Rosenberg','Customer','Petach-Ticva','Some address','333786804','123542'),(7,'michael@gmail.com','766342084f4872910acc23a16dcf14c1','Michael','Michael','Customer','Epstein','Rothild','339235723','213555'),(8,'avigail@gmail.com','766342084f4872910acc23a16dcf14c1','safdf','gfhff','Customer','dh','dgh','224967794','ghgfh');
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

-- Dump completed on 2021-11-13 23:28:56

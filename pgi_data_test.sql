# Host: localhost  (Version 5.5.5-10.4.24-MariaDB)
# Date: 2025-03-12 19:16:47
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `email` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `role` enum('admin','user') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

#
# Data for table "users"
#

INSERT INTO `users` VALUES (1,'Test','test@testing.com','$2a$12$vhCUsgm55K/qVd.Y9B8owO3GGAwSRxThuSUbZFjRQEgg2SzNn8qRq','admin','2025-03-12 03:00:34',NULL),(2,'user a','user@testing.com','$2a$14$UH6jFoCKfHXtR2S5hYwYyeCUvyMFLR0JfRKvkdKI2z4EoEeiJsj.q','user','2025-03-12 18:28:50',NULL),(3,'Mavuika','mavuika@gmail.com','$2a$14$pMLorP/QHGTC78BMPuYKWOJMNCSRt6oXRt2v/vxSivFp6ZOvis2S2','user','2025-03-12 18:34:01',NULL);

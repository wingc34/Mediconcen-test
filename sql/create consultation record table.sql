CREATE TABLE `consultationrecord` (
  `recordId` int NOT NULL AUTO_INCREMENT,
  `doctorname` varchar(45) NOT NULL,
  `patientname` varchar(45) NOT NULL,
  `diagnosis` varchar(45) NOT NULL,
  `medication` varchar(255) NOT NULL,
  `consultationfee` int NOT NULL,
  `datetime` varchar(45) NOT NULL,
  `followup` tinyint NOT NULL,
  `userid` int NOT NULL,
  PRIMARY KEY (`recordId`),
  UNIQUE KEY `recordId_UNIQUE` (`recordId`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM codetestDB.consultationrecord;
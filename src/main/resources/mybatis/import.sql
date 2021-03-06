--
--    Copyright 2015-2016 the original author or authors.
--
--    Licensed under the Apache License, Version 2.0 (the "License");
--    you may not use this file except in compliance with the License.
--    You may obtain a copy of the License at
--
--       http://www.apache.org/licenses/LICENSE-2.0
--
--    Unless required by applicable law or agreed to in writing, software
--    distributed under the License is distributed on an "AS IS" BASIS,
--    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
--    See the License for the specific language governing permissions and
--    limitations under the License.
--
--
--drop table if exists city;
--drop table if exists hotel;
--
--create table city (id int primary key auto_increment, name varchar, state varchar, country varchar);
--create table hotel (city int, name varchar, address varchar, zip varchar);
--
--insert into city (name, state, country) values ('San Francisco', 'CA', 'US');
--insert into hotel(city, name, address, zip) values (1, 'Conrad Treasury Place', 'William & George Streets', '4001')



--drop table if exists ocb_subscription;
--drop table if exists user_access;


CREATE TABLE `ocb_subscription` (
  `subscriptionId` varchar(45) NOT NULL,
  `creationDate` varchar(45) NOT NULL,
  `enabled` tinyint(4) NOT NULL,
  `entity` varchar(75) DEFAULT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`subscriptionId`)
  );



CREATE TABLE `user_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` varchar(45) NOT NULL,
  `uid` varchar(45) NOT NULL,
  `email` varchar(75) NOT NULL,
  `fullName` varchar(75) DEFAULT NULL
  PRIMARY KEY (`id`)
);


CREATE TABLE `feedback_acknowledge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ackType` text NOT NULL,
  `timestamp` text NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------
-- Server version:               10.3.15-MariaDB
-- --------------------------------------------------------
/* database created*/
CREATE DATABASE IF NOT EXISTS `payvoo`;
/*Using database*/
USE `payvoo`;

/*applicant table created to generate unique id known as applicant_id
and to store the account_type. During the user registration, first the
data will be inserted into this table, Which will create an applicant_id send back in response.*/
CREATE TABLE IF NOT EXISTS `applicant` (
  `applicant_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_type` varchar(100) NOT NULL,
  `next_step` varchar(100) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*contact table is meant to store all the contact detail of an  user like email, phone number,
 name etc. Here contact_id will auto generate which will act as primary key for this table. Here
 email and phone will be unique. */
CREATE TABLE IF NOT EXISTS `contact` (
  `contact_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `gender` varchar(100) DEFAULT 'MALE',
  `dob` date DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`contact_id`),
  KEY `fk_contact_table_applicant_id` (`applicant_id`),
  CONSTRAINT `fk_contact_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*This table to store country related data such as calling_code,country_id which are usefull 
at various time whine using this application.*/
CREATE TABLE IF NOT EXISTS `country` (
  `country_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_name` varchar(100) NOT NULL,
  `calling_code` int(11) DEFAULT NULL,
  `country_code` char(50) DEFAULT NULL,
  `currency` varchar(15) DEFAULT NULL,
  `currency_symbol` varchar(25) CHARACTER SET utf8 DEFAULT NULL,
  `status` tinyint(4) DEFAULT 0,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `country_flag_img_path` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Demo data for country*/
INSERT INTO `country` (`country_id`, `country_name`, `calling_code`, `country_code`, `currency`, `currency_symbol`, `status`, `created_on`, `updated_on`, `country_flag_img_path`) VALUES
	(1, 'BULGARIA', 359, 'BG', 'BGN', 'Лв', 1, NULL, '2019-08-29 15:08:31', '/images/country_flag_img_path/bulgaria_640.png'),
	(2, 'GERMANY', 49, 'DE', 'EUR', '£', 1, NULL, '2019-08-29 15:21:07', '/images/country_flag_img_path/germany_640.png'),
	(3, 'AUSTRIA ', 43, 'AT', 'EUR', '£', 0, NULL, '2019-08-29 15:24:11', ''),
	(4, 'BELGIUM ', 32, 'BG', 'EUR', '£', 0, NULL, '2019-08-29 15:24:06', ''),
	(5, 'INDIA', 91, 'IN', 'INR', '₹', 0, NULL, '2019-08-29 15:54:28', '/images/country_flag_img_path/india_640.png'),
	(6, 'CANARY ISLANDS ', 34, 'AT', 'EUR', '£', 0, NULL, '2019-08-29 15:24:00', ''),
	(7, 'CROATIA ', 385, 'HR', 'HRK', 'kn', 1, NULL, '2019-08-29 15:21:27', '/images/country_flag_img_path/croatia_640.png'),
	(8, 'CYPRUS ', 357, 'CY', 'EUR', '£', 1, NULL, '2019-08-29 15:22:08', '/images/country_flag_img_path/cyprus_640.png'),
	(9, 'CZECH REPUBLIC', 420, 'CZ', 'CZK', 'Kč', 1, NULL, '2019-08-29 15:22:25', '/images/country_flag_img_path/czech_republic_640.png'),
	(10, 'ESTONIA ', 372, 'EE', 'EUR', '£', 1, NULL, '2019-08-29 15:22:48', '/images/country_flag_img_path/estonia_640.png'),
	(11, 'AZORES ', 351, 'PT', 'EUR', '£', 0, NULL, '2019-08-29 15:23:56', ''),
	(12, 'DENMARK', 45, 'DK', 'DKK', 'Kr', 1, NULL, '2019-08-29 15:23:08', '/images/country_flag_img_path/denmark_640.png'),
	(13, 'FINLAND', 358, 'FI', 'EUR', '£', 1, NULL, '2019-08-29 15:23:24', '/images/country_flag_img_path/finland_640.png'),
	(14, 'FRANCE', 33, 'FR', 'EUR', '£', 1, NULL, '2019-08-29 15:23:42', '/images/country_flag_img_path/france_640.png'),
	(15, 'FRENCH GUIANA', 594, 'GF', 'EUR', '£', 0, NULL, '2019-08-29 15:23:53', ''),
	(16, 'GIBRALTER', 350, 'GI', 'EUR', '£', 0, NULL, '2019-08-29 15:23:49', ''),
	(17, 'GREECE', 30, 'GR', 'EUR', '£', 1, NULL, '2019-08-29 15:20:48', '/images/country_flag_img_path/greece_640.png'),
	(18, 'GUADELOUPE', 590, 'GP', 'EUR', '£', 0, NULL, '2019-08-29 15:35:00', ''),
	(19, 'SWEDEN', 46, 'SE', 'SEK', 'kr', 1, NULL, '2019-08-29 15:19:37', '/images/country_flag_img_path/sweden_640.png'),
	(20, 'UK', 44, 'UK', 'GBP', '£', 1, NULL, '2019-08-29 15:09:17', '/images/country_flag_img_path/united_kingdom_640.png'),
	(21, 'HUNGARY', 36, 'HU', 'HUF', 'Ft', 1, NULL, '2019-08-29 15:09:43', '/images/country_flag_img_path/hungary_640.png'),
	(22, 'IRELAND', 353, 'IE', 'EUR', '£', 1, NULL, '2019-08-29 15:10:28', '/images/country_flag_img_path/ireland_640.png'),
	(23, 'ITALY', 39, 'IT', 'EUR', '£', 1, NULL, '2019-08-29 15:10:46', '/images/country_flag_img_path/italy_640.png'),
	(24, 'LATVIA', 371, 'LV', 'EUR', '£', 1, NULL, '2019-08-29 15:11:02', '/images/country_flag_img_path/latvia_640.png'),
	(25, 'LITHUANIA', 370, 'LT', 'EUR', '£', 1, NULL, '2019-08-29 15:11:36', '/images/country_flag_img_path/lithuania_640.png'),
	(26, 'LUXEMBOURG', 352, 'LU', 'EUR', '£', 1, NULL, '2019-08-29 15:12:06', '/images/country_flag_img_path/luxembourg_640.png'),
	(27, 'MALTA', 356, 'MT', 'EUR', '£', 1, NULL, '2019-08-29 15:12:22', '/images/country_flag_img_path/malta_640.png'),
	(28, 'NETHERLANDS', 31, 'NL', 'EUR', '£', 1, NULL, '2019-08-29 15:12:58', '/images/country_flag_img_path/netherlands_640.png'),
	(29, 'POLAND', 48, 'PL', 'PLZ', 'zł', 1, NULL, '2019-08-29 15:13:14', '/images/country_flag_img_path/poland_640.png'),
	(30, 'PORTUGAL', 351, 'PT', 'EUR', '£', 1, NULL, '2019-08-29 15:13:33', '/images/country_flag_img_path/portugal_640.png'),
	(31, 'ROMANIA', 40, 'RO', 'RON', 'leu', 1, NULL, '2019-08-29 15:13:50', '/images/country_flag_img_path/romania_640.png'),
	(32, 'SLOVAKIA', 421, 'SK', 'EUR', '£', 1, NULL, '2019-08-29 15:18:46', '/images/country_flag_img_path/slovakia_640.png'),
	(33, 'SLOVENIA', 386, 'SI', 'EUR', '£', 1, NULL, '2019-08-29 15:19:01', '/images/country_flag_img_path/slovenia_640.png'),
	(34, 'SPAIN', 34, 'ES', 'EUR', '£', 1, NULL, '2019-08-29 15:19:16', '/images/country_flag_img_path/spain_640.png'),
	(35, 'USA', 1, 'US', 'USD', '$', 0, NULL, '2019-08-29 15:44:11', '/images/country_flag_img_path/united_states_of_america_640.png');
/*This table is to store type of address of an individual user or a company. Input value will be like 
'PERSONAL','BUSINESS' or 'OPERATIG'*/
CREATE TABLE IF NOT EXISTS `address_type` (
  `address_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `address_type` varchar(50) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`address_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*inserting Demo data into address_type table*/
INSERT INTO `address_type` (`address_type_id`, `address_type`) VALUES
	(1, 'PERSONAL_ADDRESS'),
	(2, 'BUSINESS_ADDRESS'),
	(3, 'OPERATING_ADDRESS'),
	(4, 'SHIPPING_ADDRESS'),
	(5, 'BILLING_ADDRESS');

/*This table is to store address detail of an user as well as company with respective address_type.*/
CREATE TABLE IF NOT EXISTS `address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `country_id` int(50) DEFAULT NULL,
  `address_type_id` int(11) DEFAULT 1,
  `address_line1` varchar(100) DEFAULT NULL,
  `address_line2` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `town` varchar(100) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`address_id`),
  KEY `fk_address_table_applicant_id` (`applicant_id`),
  KEY `fk_address_table_contact_id` (`contact_id`),
  KEY `fk_address_table_country_id` (`country_id`),
  KEY `fk_address_table_address_type_id` (`address_type_id`),
  CONSTRAINT `fk_address_table_address_type_id` FOREIGN KEY (`address_type_id`) REFERENCES `address_type` (`address_type_id`),
  CONSTRAINT `fk_address_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  CONSTRAINT `fk_address_table_contact_id` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`contact_id`),
  CONSTRAINT `fk_address_table_country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*This table is to store different roles defiened in this application.*/
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Insert demo data into role table*/
INSERT INTO `role` (`role_id`, `role_name`) VALUES
	(1, 'PERSONAL'),
	(2, 'ACCOUNT_OWNER'),
	(3, 'USER'),
	(4, 'ADMIN'),
	(5, 'BUSINESS'),
  (6,'MERCHANT'),
  (7,'SANDBOX');

/*This table is used for authentication purpose it will store email as user_id and hashed password.
It will authenticate  each user during login.*/
CREATE TABLE IF NOT EXISTS `user_login` (
  `user_id` varchar(250) NOT NULL,
  `applicant_id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `passcode_pin` int(11) DEFAULT NULL,
  `email_verified` tinyint(4) DEFAULT NULL,
  `mobile_verified` tinyint(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_id`),
  KEY `fk_user_login_table_applicant_id` (`applicant_id`),
  KEY `fk_user_login_table_role_id` (`role_id`),
  CONSTRAINT `fk_user_login_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  CONSTRAINT `fk_user_login_table_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*This table will store different types of document for different countres.*/
CREATE TABLE IF NOT EXISTS `kyc_document_lov` (
  `kyc_doc_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` int(11) DEFAULT NULL,
  `document_name` varchar(25) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`kyc_doc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*This table is to store kycrelated data of an user.*/
CREATE TABLE IF NOT EXISTS `kyc` (
  `kyc_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `kyc_doc_id` int(11) DEFAULT NULL,
  `kyc_transaction_id` varchar(50) DEFAULT NULL,
  `kyc_vendor_id` varchar(50) DEFAULT NULL,
  `kyc_status` varchar(250) DEFAULT 'PENDING',
  `kyc_doc_front` blob DEFAULT NULL,
  `kyc_doc_back` blob DEFAULT NULL,
  `photograph` blob DEFAULT NULL,
  `kyc_initiated_on` datetime DEFAULT NULL,
  `kyc_updated_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `completed_on` datetime DEFAULT NULL,
  PRIMARY KEY (`kyc_id`),
  KEY `fk_kyc_table_applicant_id` (`applicant_id`),
  KEY `fk_kyc_table_kyc_doc_id` (`kyc_doc_id`),
  CONSTRAINT `fk_kyc_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  CONSTRAINT `fk_kyc_table_kyc_doc_id` FOREIGN KEY (`kyc_doc_id`) REFERENCES `kyc_document_lov` (`kyc_doc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*This table is used at time of otp verification. For email and mobile phone verification.*/
CREATE TABLE IF NOT EXISTS `token_validator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(80) NOT NULL,
  `otp` varchar(10) NOT NULL,
  `otp_status` enum('0','1','2') NOT NULL DEFAULT '0',
  `expired` int(11) NOT NULL DEFAULT 300000,
  `mobile_no` varchar(50) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*For KYB process*/

/*This table is for authentication of business users in business app.*/
CREATE TABLE IF NOT EXISTS `business_users` (
  `business_users_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `user_id` varchar(100) NOT NULL,
  `passcode_pin` int(11) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email_verified` tinyint(1) DEFAULT NULL,
  `mobile_verified` tinyint(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_users_id`),
  KEY `fk-business_users_table_applicant_id` (`applicant_id`),
  KEY `fk_business_users_table_role_id` (`role_id`),
  CONSTRAINT `business_users_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  CONSTRAINT `fk_business_users_table_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*This table is to store type of business. i.e solo or partner.*/
CREATE TABLE IF NOT EXISTS `business_type` (
  `business_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_type_name` varchar(50) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*Demo data for business_type*/
INSERT INTO `business_type` (`business_type_id`, `business_type_name`) VALUES
	(1, 'SOLE  PROPRIETORSHIP'),
	(2, 'PARTNERSHIP'),
	(3, 'CORPORATION'),
	(4, 'LIMITED  LIABILITY  COMPANY'),
	(5, 'COOPERATIVE'),
  (6,'SANDBOX');
  
/*This is the main table which will  store all the business related data such as Name, trading name,
 incorporation date, country and details of directors also.*/

 CREATE TABLE IF NOT EXISTS `business_details` (
  `business_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `country_of_incorporation` int(11) DEFAULT NULL,
  `business_type` int(11) DEFAULT NULL,
  `business_legal_name` varchar(50) DEFAULT NULL,
  `trading_name` varchar(50) DEFAULT NULL,
  `registration_number` varchar(50) DEFAULT NULL,
  `incorporation_date` date DEFAULT NULL,
  `business_directors` longtext DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_id`),
  KEY `fk_business_details_table_applicant_id` (`applicant_id`),
  KEY `fk_business_details_table_country_of_incorporation` (`country_of_incorporation`),
  KEY `fk_business_details_table_business_type` (`business_type`),
  CONSTRAINT `fk_business_details_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  CONSTRAINT `fk_business_details_table_business_type` FOREIGN KEY (`business_type`) REFERENCES `business_type` (`business_type_id`),
  CONSTRAINT `fk_business_details_table_country_of_incorporations_country` FOREIGN KEY (`country_of_incorporation`) REFERENCES `country` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*This is meant to store the staus of various KYB steps*/
CREATE TABLE IF NOT EXISTS `kyb_business` (
  `kyb_business_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `kyb_status` varchar(15) DEFAULT NULL,
  `kyb_initiated_on` datetime DEFAULT NULL,
  `kyb_updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `kyb_completed_on` datetime DEFAULT NULL,
  `isRestricted` tinyint(4) DEFAULT 0,
  `type_of_business` enum('0','1','2') NOT NULL DEFAULT '0',
  `business_address` enum('0','1','2') NOT NULL DEFAULT '0',
  `personal_profile` enum('0','1','2') NOT NULL DEFAULT '0',
  `business_owner_details` enum('0','1','2') NOT NULL DEFAULT '0',
  PRIMARY KEY (`kyb_business_id`),
  KEY `kyb_business_table_business_id` (`business_id`),
  CONSTRAINT `kyb_business_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*This table to store refference of business related docs*/
CREATE TABLE IF NOT EXISTS `kyb_business_docs` (
  `kyb_business_docs_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `kyb_doc_type` varchar(250) DEFAULT NULL,
  `kyb_doc_file_type` varchar(250) DEFAULT NULL,
  `kyb_doc_base64` longtext DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  PRIMARY KEY (`kyb_business_docs_id`),
  KEY `kyb_business_docs_table_business_id` (`business_id`),
  CONSTRAINT `kyb_business_docs_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*This table will store kyb related data of a business owner*/
CREATE TABLE IF NOT EXISTS `kyb_business_owner` (
  `kyb_bo_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `dob` varchar(50) DEFAULT NULL,
  `percentage` varchar(50) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`kyb_bo_id`),
  KEY `kyb_business_owner_table_business_id` (`business_id`),
  CONSTRAINT `kyb_business_owner_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*This table is meant to store tha data of each country detail with whome a company will do transaction*/
CREATE TABLE IF NOT EXISTS `business_transaction_countries` (
  `business_transaction_countries_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `business_description` varchar(150) DEFAULT NULL,
  `transaction_type` varchar(25) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_transaction_countries_id`),
  KEY `business_transaction_countries_table_business_id` (`business_id`),
  KEY `business_transaction_countries_table_country_id` (`country_id`),
  CONSTRAINT `business_transaction_countries_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`),
  CONSTRAINT `business_transaction_countries_table_country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*This table will store the transaction detail of each business*/
CREATE TABLE IF NOT EXISTS `business_transactions` (
  `business_trans_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `monthly_transfer_amount` varchar(50) DEFAULT NULL,
  `no_payments_per_month` varchar(50) DEFAULT NULL,
  `max_value_of_payments` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_trans_id`),
  KEY `fk_business_transactiona_table_business_id` (`business_id`),
  CONSTRAINT `fk_business_transactiona_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/**/
CREATE TABLE IF NOT EXISTS `business_service_lov` (
  `business_service_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_service_name` varchar(50) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*This table is to store the data ralated business sector like Agricultur,Minning and Transport*/
CREATE TABLE IF NOT EXISTS `business_sector_lov` (
  `business_sector_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_sector_name` varchar(250) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_sector_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `business_sector_lov` (`business_sector_id`, `business_sector_name`) VALUES
	(1, 'Agriculture, Forestry and Fishing'),
	(2, 'Mining'),
	(3, 'Construction'),
	(4, 'Manufacturing'),
	(5, 'Transportation, Communications, Electric, Gas and Sanitary services'),
	(6, 'Wholesale Trade'),
	(7, 'Retail Trade'),
	(8, 'Finance, Insurance and Real Estate'),
	(9, 'Services'),
	(10, 'Public Administration');
/*This table will store the data of selected business sector and social media etc.*/
CREATE TABLE IF NOT EXISTS `business_sector_details` (
  `business_sector_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `business_sector` int(11) DEFAULT NULL,
  `range_of_service` varchar(250) DEFAULT NULL,
  `website` varchar(150) DEFAULT NULL,
  `restricted_business` tinyint(1) DEFAULT NULL,
  `selected_industries` varchar(150) DEFAULT NULL,
  `restricted_industries` varchar(150) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_sector_details_id`),
  KEY `fk_business_sector_details_table_business_id` (`business_id`),
  KEY `fk_business_sector_details_table_business_sector` (`business_sector`),
  CONSTRAINT `fk_business_sector_details_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`),
  CONSTRAINT `fk_business_sector_details_table_business_sector` FOREIGN KEY (`business_sector`) REFERENCES `business_sector_lov` (`business_sector_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*This table is to store all the owner of a business */
CREATE TABLE IF NOT EXISTS `business_owner` (
  `business_owner_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `business_owner_type` varchar(25) DEFAULT NULL,
  `percentage` varchar(25) DEFAULT NULL,
  `email_verified` tinyint(4) DEFAULT NULL,
  `mobile_verfied` tinyint(4) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_owner_id`),
  KEY `fk_business_owner_table_business_id` (`business_id`),
  KEY `fk_business_owner_table_conatct_id` (`contact_id`),
  CONSTRAINT `fk_business_owner_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`),
  CONSTRAINT `fk_business_owner_table_conatct_id` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*To store all the available industry with wheather they are in restricted category or not.*/
CREATE TABLE IF NOT EXISTS `business_industry_lov` (
  `business_industry_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_industry_name` varchar(250) DEFAULT NULL,
  `restricted` tinyint(4) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_industry_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for business_industry_lov table*/
INSERT INTO `business_industry_lov` (`business_industry_id`, `business_industry_name`,`restricted`) VALUES
	(1, 'Armaments, nuclear, weapons or defense manufacturers',1),
	(2, 'Adult entertainment or the sale or advertising of sexual services',1),
	(3, 'Art dealers, auction houses or pawnbroker',0),
	(4, 'Industrial chemical or legal high companies',0),
	(5, 'Client money processing firms',0),
	(6, 'Cryptocurrency processing firms',1),
	(7, 'FX speculators',0),
	(8, 'Gambling firms or video game arcades',1),
	(9, 'Nonprofit, political and religious organisations',0),
	(10, 'Precious metals and stones firms',0),
	(11, 'Sale of used cars or heavy industry vehicles',0);

  /*Store all the details of a company which are retrived from KOMPANY API.*/
  CREATE TABLE IF NOT EXISTS `kyb_company_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kyb_business_id` int(11) DEFAULT NULL,
  `company_details` longtext DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `update_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_kyb_company_details_table_kyb_business_id` (`kyb_business_id`),
  CONSTRAINT `fk_kyb_company_details_table_kyb_business_id` FOREIGN KEY (`kyb_business_id`) REFERENCES `business_details` (`business_id`)
);

/*Table to store card details of an user*/

CREATE TABLE `payment_cards` (
  `payment_cards_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) NOT NULL DEFAULT 0,
  `card_type` varchar(50) NOT NULL DEFAULT '',
  `name_on_card` varchar(64) NOT NULL DEFAULT '',
  `card_number` varchar(32) NOT NULL DEFAULT '',
  `card_cvv` varchar(16) NOT NULL DEFAULT '',
  `card_month` tinyint(2) NOT NULL DEFAULT 0,
  `card_year` smallint(6) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `default_card` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`payment_cards_id`),
  KEY `fk__payment_cards_applicant_id` (`applicant_id`),
  CONSTRAINT `fk__payment_cards_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table to store payment detail of individual user*/

CREATE TABLE IF NOT EXISTS `payments` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `paymentsid` int(11) NOT NULL,
  `paymentType` enum('DB','CR') NOT NULL,
  `status` varchar(100) DEFAULT NULL,
  `payment_Brand` varchar(15) DEFAULT NULL,
  `payment_Mode` varchar(15) DEFAULT NULL,
  `first_Name` varchar(50) DEFAULT NULL,
  `last_Name` varchar(50) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT 0,
  `currency` varchar(11) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `result` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `card` longtext DEFAULT NULL,
  `customer` longtext DEFAULT NULL,
  `transaction_details` longtext DEFAULT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `merchant_Transaction_Id` varchar(100) DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `trans_Status` varchar(100) DEFAULT NULL,
  `tmpl_amount` decimal(15,2) DEFAULT NULL,
  `tmpl_currency` varchar(100) DEFAULT NULL,
  `eci` varchar(100) DEFAULT NULL,
  `checksum` varchar(100) DEFAULT NULL,
  `order_Description` varchar(100) DEFAULT NULL,
  `company_Name` varchar(100) DEFAULT NULL,
  `merchant_contact` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `fk_payments_table_applicant_id` (`applicant_id`),
  CONSTRAINT `fk_payments_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*To stote accounts data*/

CREATE TABLE IF NOT EXISTS `accounts` (
  `account_no` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) NOT NULL DEFAULT 0,
  `role_id` int(11) DEFAULT NULL,
  `currency` varchar(15) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `balance` decimal(15,2) DEFAULT 0,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`account_no`),
  KEY `fk_accountstable_applicant_id` (`applicant_id`),
  KEY `fk_accounts_table_role_id` (`role_id`),
  CONSTRAINT `fk_accounts_table_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/* Table to store the transactions*/
CREATE TABLE IF NOT EXISTS `transactions` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `transaction_number` varchar(50) DEFAULT NULL,
  `transaction_type` enum('DB','CR') DEFAULT NULL,
  `from_account` int(11) NOT NULL DEFAULT 0,
  `to_account` int(11) NOT NULL DEFAULT 0,
  `opposite_account_owner` varchar(100) DEFAULT NULL,
  `account_type` varchar(15) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT 0,
  `created_on` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`transaction_id`),
  KEY `fk_transaction_table_applicant_id` (`applicant_id`),
  KEY `fk_transaction_table_from_account` (`from_account`),
  KEY `fk_transaction_table_to_account` (`to_account`),
  CONSTRAINT `fk_transaction_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  CONSTRAINT `fk_transaction_table_from_account` FOREIGN KEY (`from_account`) REFERENCES `accounts` (`account_no`),
  CONSTRAINT `fk_transaction_table_to_account` FOREIGN KEY (`to_account`) REFERENCES `accounts` (`account_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*table to store Rates of currency*/
CREATE TABLE IF NOT EXISTS `check_rates` (
  `check_rates_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `from_currency` varchar(25) DEFAULT NULL,
  `to_currency` varchar(25) DEFAULT NULL,
  `isConvert` tinyint(4) DEFAULT 0,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`check_rates_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/* Table for sandbox */
CREATE TABLE IF NOT EXISTS `sandbox` (
  `sandbox_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `memberId` varchar(100) DEFAULT NULL,
  `api_key` varchar(100) DEFAULT NULL,
  `url` varchar(150) DEFAULT NULL,
  `api_doc_url` varchar(150) DEFAULT NULL,
  `redirect_url` varchar(150) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`sandbox_id`),
  KEY `fk_payvoo_sandbox_table_applicant_id` (`applicant_id`),
  CONSTRAINT `fk_payvoo_sandbox_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table for currency exchange*/

CREATE TABLE IF NOT EXISTS `currency_exchange` (
  `auto_exchange_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `account_no` int(11) DEFAULT NULL,
  `from_currency` varchar(15) DEFAULT NULL,
  `to_currency` varchar(15) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `target_amount` decimal(15,2) DEFAULT NULL,
  `exchange_status` tinyint(4) NOT NULL DEFAULT 1,
  `notify` tinyint(4) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`auto_exchange_id`),
  KEY `fk_check_rates_table_applicant_id` (`applicant_id`),
  CONSTRAINT `fk_check_rates_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/* Table for user roles*/
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_roles_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `business_users_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_roles_id`),
  KEY `fk_user_roles_table_applicant_id` (`applicant_id`),
  KEY `fk_user_roles_table_role_id` (`role_id`),
  KEY `fk_user_roles_table_business_users_id` (`business_users_id`),
  CONSTRAINT `fk_user_roles_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  CONSTRAINT `fk_user_roles_table_business_users_id` FOREIGN KEY (`business_users_id`) REFERENCES `business_users` (`business_users_id`),
  CONSTRAINT `fk_user_roles_table_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table for perr-contact*/
CREATE TABLE `peer_contact` (
  `peer_contact_id` int(50) NOT NULL AUTO_INCREMENT,
  `applicant_id_from` int(50) NOT NULL DEFAULT 0,
  `applicant_id_to` int(50) NOT NULL DEFAULT 0,
  `contact_number` varchar(50) NOT NULL DEFAULT '0',
  `mobile_number` varchar(50) NOT NULL DEFAULT '0',
  `name` varchar(50) NOT NULL DEFAULT '0',
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`peer_contact_id`),
  KEY `fk_perr_contact_table_applicant_id` (`applicant_id_from`),
  CONSTRAINT `fk_perr_contact_table_applicant_id` FOREIGN KEY (`applicant_id_from`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table for logs*/
CREATE TABLE `logs` (
  `logs_id` int(25) NOT NULL AUTO_INCREMENT,
  `email` varchar(25) NOT NULL,
  `status_code` int(25) NOT NULL,
  `request` longtext NOT NULL,
  `response` longtext NOT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`logs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table for JWT token verification*/
CREATE TABLE `sandbox_token_validator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) NOT NULL,
  `member_token` varchar(2555) DEFAULT NULL,
  `member_id` varchar(225) DEFAULT NULL,
  `expiry` int(10) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table to store Runtime log configuration of modules*/
CREATE TABLE `server_logs` (
  `logs_id` int(11) NOT NULL AUTO_INCREMENT,
  `module` varchar(250) NOT NULL,
  `status` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`logs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Demo data for server_logs table*/
INSERT INTO server_logs (logs_id,module,status) VALUES 
(1,'controller.authentication.authentication',1),
(2,'model.tokenmodel',1),
(3,'controller.mockapis.mockcontroller',1),
(4,'model.mockmodel',1),
(5,'controller.authentication.authentication',1),
(6,'model.tokenmodel',1),
(7,'controller.mockapis.mockcontroller',1),
(8,'model.mockmodel',1),
(9,'controller.authentication.authentication',1),
(10,'model.tokenmodel',1),
(11,'controller.mockapis.mockcontroller',1),
(12,'model.mockmodel',1),
(13,'utility.validate',1);

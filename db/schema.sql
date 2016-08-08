CREATE DATABASE burgers;

USE burgers;

CREATE TABLE burgers_db(
id int(100) NOT NULL AUTO_INCREMENT,
burger_name VARCHAR(50), 
devoured BOOLEAN,
date TIMESTAMP,
PRIMARY KEY (id)
)


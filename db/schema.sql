USE burgers_db;

CREATE TABLE burgers(
id INTEGER(11) AUTO_INCREMENT NOT NULL,
burger_name VARCHAR(50), 
devoured BOOLEAN,
date_time TIMESTAMP,
PRIMARY KEY (id)
)
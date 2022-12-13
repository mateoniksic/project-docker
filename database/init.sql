CREATE DATABASE IF NOT EXISTS db_app;

USE db_app;

DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) DEFAULT NULL,
    description VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO tasks(title, description)
VALUES(
'Task 1',
'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
);
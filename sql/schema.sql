CREATE DATABASE light_of_vision;
USE light_of_vision;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE levels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level_name VARCHAR(100) NOT NULL,
    difficulty INT NOT NULL,
    description TEXT
);

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    power INT NOT NULL,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE player_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    level_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    time_spent INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (level_id) REFERENCES levels(id)
);

CREATE TABLE game_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

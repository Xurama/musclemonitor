-- Crée la base de données
CREATE DATABASE IF NOT EXISTS muscle_monitor;

-- Utilise la base de données
USE muscle_monitor;

-- Table pour stocker les utilisateurs
CREATE TABLE mm_users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour stocker les séances d'entraînement
CREATE TABLE mm_workouts (
    workout_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    cardio BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES mm_users(user_id) ON DELETE CASCADE
);

-- Table pour stocker les exercices dans chaque séance
CREATE TABLE mm_exercises (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    workout_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    sets INT NOT NULL,
    reps INT NOT NULL,
    weight DECIMAL(5,2),
    rest_time INT, -- Temps de repos en secondes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workout_id) REFERENCES mm_workouts(workout_id) ON DELETE CASCADE
);

-- Table pour stocker les groupes musculaires travaillés
CREATE TABLE mm_muscle_groups (
    muscle_group_id INT AUTO_INCREMENT PRIMARY KEY,
    workout_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY (workout_id) REFERENCES mm_workouts(workout_id) ON DELETE CASCADE
);

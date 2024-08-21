-- Crée la base de données
CREATE DATABASE IF NOT EXISTS muscle_monitor;

-- Utilise la base de données
USE muscle_monitor;

-- Table pour stocker les utilisateurs
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour stocker les séances d'entraînement
CREATE TABLE workouts (
    workout_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    cardio BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Table pour stocker les exercices dans chaque séance
CREATE TABLE exercises (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    workout_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    sets INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workout_id) REFERENCES workouts(workout_id) ON DELETE CASCADE
);


-- Table pour stocker les groupes musculaires travaillés
CREATE TABLE muscle_groups (
    muscle_group_id INT AUTO_INCREMENT PRIMARY KEY,
    workout_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY (workout_id) REFERENCES workouts(workout_id) ON DELETE CASCADE
);

-- Table pour stocker les types de groupes musculaires disponibles
CREATE TABLE muscle_group_types (
    muscle_group_type_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Modification de la table muscle_groups pour utiliser la nouvelle table muscle_group_types
ALTER TABLE muscle_groups
ADD muscle_group_type_id INT,
ADD FOREIGN KEY (muscle_group_type_id) REFERENCES muscle_group_types(muscle_group_type_id) ON DELETE CASCADE;

-- Mise à jour de la table muscle_groups pour retirer le champ 'name'
ALTER TABLE muscle_groups DROP COLUMN name;

INSERT INTO muscle_group_types (name) VALUES
('pectoraux'),
('dos'),
('epaules'),
('triceps'),
('biceps'),
('jambes'),
('abdos');

CREATE TABLE cardio_exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workout_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    activity_time INT NOT NULL, -- Temps d'activité en minutes
    notes TEXT, -- Notes optionnelles
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workout_id) REFERENCES workouts(workout_id) ON DELETE CASCADE
);

CREATE TABLE reps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_id INT NOT NULL,
    set_number INT NOT NULL,
    reps INT NOT NULL,
    FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id) ON DELETE CASCADE
);

CREATE TABLE weights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_id INT NOT NULL,
    set_number INT NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id) ON DELETE CASCADE
);

CREATE TABLE rest_times (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_id INT NOT NULL,
    set_number INT NOT NULL,
    rest_time INT NOT NULL,  -- Temps de repos en secondes
    FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id) ON DELETE CASCADE
);


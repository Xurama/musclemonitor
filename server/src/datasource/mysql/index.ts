import { DataTypes } from "@/datasource";
import { Entities } from "@/domain";
import Builder from "./builder";

export interface MySQLDataSource {
  // User methods
  findUserByUsername(username: string): Promise<DataTypes.UserDb | null>;
  insertUser(user: Entities.User): Promise<DataTypes.UserDb>;
  findUserById(id: number): Promise<DataTypes.UserDb | null>;

  // Workout methods
  insertWorkout(workout: Entities.Workout): Promise<DataTypes.WorkoutDb>;
  findWorkoutById(id: number): Promise<DataTypes.WorkoutDb | null>;

  // Exercise methods
  insertExercise(exercise: Entities.Exercise): Promise<DataTypes.ExerciseDb>;
  findExerciseById(id: number): Promise<DataTypes.ExerciseDb | null>;

  // MuscleGroup methods
  insertMuscleGroup(muscleGroup: Entities.MuscleGroup): Promise<DataTypes.MuscleGroupDb>;
  findMuscleGroupById(id: number): Promise<DataTypes.MuscleGroupDb | null>;
}

export class MySQLDataSourceImpl implements MySQLDataSource {
  // User methods
  async findUserByUsername(username: string): Promise<DataTypes.UserDb | null> {
    const connection = await Builder.db();
    const [rows] = await connection.query("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  }

  async insertUser(user: Entities.User): Promise<DataTypes.UserDb> {
    const connection = await Builder.db();
    const [result] = await connection.query(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [user.username, user.email, user.passwordHash]
    );
  
    return { id: result.insertId, username: user.username, email: user.email, password_hash: user.passwordHash };
  }
  

  async findUserById(id: number): Promise<DataTypes.UserDb | null> {
    const connection = await Builder.db();
    const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);

    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  }

  // Workout methods
  async insertWorkout(workout: Entities.Workout): Promise<DataTypes.WorkoutDb> {
    const connection = await Builder.db();
    const [result] = await connection.query(
      "INSERT INTO workouts (user_id, date, cardio, notes) VALUES (?, ?, ?, ?)",
      [workout.userId, workout.date, workout.cardio, workout.notes]
    );
  
    return { id: result.insertId, user_id: workout.userId, date: workout.date, cardio: workout.cardio, notes: workout.notes };
  }
  

  async findWorkoutById(id: number): Promise<DataTypes.WorkoutDb | null> {
    const connection = await Builder.db();
    const [rows] = await connection.query("SELECT * FROM workouts WHERE id = ?", [id]);

    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  }

  // Exercise methods
  async insertExercise(exercise: Entities.Exercise): Promise<DataTypes.ExerciseDb> {
    const connection = await Builder.db();
    const [result] = await connection.query(
      "INSERT INTO exercises (workout_id, name, sets, reps, weight, rest_time) VALUES (?, ?, ?, ?, ?, ?)",
      [exercise.workoutId, exercise.name, exercise.sets, exercise.reps, exercise.weight, exercise.restTime]
    );
  
    return {
      id: result.insertId,
      workout_id: exercise.workoutId,
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      rest_time: exercise.restTime
    };
  }
  

  async findExerciseById(id: number): Promise<DataTypes.ExerciseDb | null> {
    const connection = await Builder.db();
    const [rows] = await connection.query("SELECT * FROM exercises WHERE id = ?", [id]);

    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  }

  // MuscleGroup methods
  async insertMuscleGroup(muscleGroup: Entities.MuscleGroup): Promise<DataTypes.MuscleGroupDb> {
    const connection = await Builder.db();
    const [result] = await connection.query(
      "INSERT INTO muscle_groups (workout_id, name) VALUES (?, ?)",
      [muscleGroup.workoutId, muscleGroup.name]
    );
  
    return { id: result.insertId, workout_id: muscleGroup.workoutId, name: muscleGroup.name };
  }
  

  async findMuscleGroupById(id: number): Promise<DataTypes.MuscleGroupDb | null> {
    const connection = await Builder.db();
    const [rows] = await connection.query("SELECT * FROM muscle_groups WHERE id = ?", [id]);

    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  }
}

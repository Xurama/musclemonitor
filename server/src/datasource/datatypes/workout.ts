import { ExerciseDb } from "./exercise";
import { MuscleGroupDb } from "./muscleGroup";
import { CardioExerciseDb } from "./cardioExercise";  // Ajout du type pour les exercices de cardio

export type WorkoutDb = {
  id?: number;          // Optional ID, as it is set upon creation
  userId?: number;
  date: string;
  cardio: boolean;
  name: string;
  exercises: ExerciseDb[];      // List of exercises associated with the workout
  muscle_groups: MuscleGroupDb[]; // List of muscle groups associated with the workout
  cardio_exercises: CardioExerciseDb[]; // List of cardio exercises associated with the workout (optionnel)
};

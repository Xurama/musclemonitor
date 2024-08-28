import { Exercise } from "./exercise";
import { MuscleGroup } from "./muscleGroup";
import { CardioExercise } from "./cardioExercise";  // Ajout du type pour les exercices de cardio

export type Workout = {
  workout_id: number;          // Optional ID, as it is set upon creation
  userId?: number;
  date: string;
  cardio: boolean;
  name: string;
  exercises: Exercise[];      // List of exercises associated with the workout
  muscle_groups: MuscleGroup[]; // List of muscle groups associated with the workout
  cardio_exercises: CardioExercise[]; // List of cardio exercises associated with the workout (optionnel)
};

export type CardioExercise = {
    id?: number;           // Optional ID, as it is set upon creation
    workoutId: number;     // Foreign key to associate with a workout
    name: string;
    activity_time: number; // Time in minutes
    notes?: string;        // Optional notes
  };
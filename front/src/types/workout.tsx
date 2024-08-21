export type Workout = {
    date: string;
    cardio: boolean;
    exercises: Array<{
      name: string;
      sets: number;
      reps: number[];
      weight: number[];
      rest_time: number[];
    }>;
    muscle_groups: Array<{ name: string }>;
    cardio_exercises?: Array<{
      name: string;
      activity_time: number;
    }>;
  }
  
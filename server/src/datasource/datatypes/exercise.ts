export type ExerciseDb = {
  id?: number;
  workoutId: number;
  name: string;
  sets: number;
  reps: RepsDb[];
  weight: WeightDb[];
  rest_time: RestTimeDb[];
};

export type RepsDb = {
  reps: number;
};

export type WeightDb = {
  weight: number;
};

export type RestTimeDb = {
  rest_time: number;
};

export type Exercise = {
    id?: number;
    workoutId: number;
    name: string;
    sets: number;
    reps: Reps[];
    weight: Weight[];
    rest_time: RestTime[];
  };

  export type Reps = {
    reps: number;
  }

  export type Weight = {
    weight: number;
  };
  
  export type RestTime = {
    rest_time: number;
  };
  
  
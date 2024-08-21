import { Repositories, Entities } from "@/domain";

export interface CreateWorkoutUseCase {
  execute: (workout: Entities.Workout) => Promise<Entities.Workout>;
}

export class CreateWorkoutUseCaseImpl implements CreateWorkoutUseCase {
  workoutRepository: Repositories.WorkoutRepository;

  constructor(workoutRepository: Repositories.WorkoutRepository) {
    this.workoutRepository = workoutRepository;
  }

  async execute(workout: Entities.Workout): Promise<Entities.Workout> {
    console.log(`usecase | createWorkout(${workout})`);
    return await this.workoutRepository.createWorkout(workout);
  }
}

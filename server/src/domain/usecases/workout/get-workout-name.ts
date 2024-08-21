import { Repositories, Entities } from "@/domain";

export interface GetWorkoutByNameUseCase {
  execute: (name: string) => Promise<Entities.Workout | null>;
}

export class GetWorkoutByNameUseCaseImpl implements GetWorkoutByNameUseCase {
  workoutRepository: Repositories.WorkoutRepository;

  constructor(workoutRepository: Repositories.WorkoutRepository) {
    this.workoutRepository = workoutRepository;
  }

  async execute(name: string): Promise<Entities.Workout | null> {
    console.log(`usecase | getWorkoutByName(${name})`);
    return await this.workoutRepository.getWorkoutByName(name);
  }
}

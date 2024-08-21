import { Repositories, Entities } from "@/domain";

export interface GetWorkoutByIdUseCase {
  execute: (id: number) => Promise<Entities.Workout | null>;
}

export class GetWorkoutByIdUseCaseImpl implements GetWorkoutByIdUseCase {
  workoutRepository: Repositories.WorkoutRepository;

  constructor(workoutRepository: Repositories.WorkoutRepository) {
    this.workoutRepository = workoutRepository;
  }

  async execute(id: number): Promise<Entities.Workout | null> {
    console.log(`usecase | getWorkoutById(${id})`);
    return await this.workoutRepository.getWorkoutById(id);
  }
}

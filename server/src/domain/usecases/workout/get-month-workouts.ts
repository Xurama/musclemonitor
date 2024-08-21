import { Repositories, Entities } from "@/domain";

export interface GetWorkoutsByMonthUseCase {
  execute: (params: { year: number; month: number }) => Promise<Entities.Workout[]>;
}

export class GetWorkoutsByMonthUseCaseImpl implements GetWorkoutsByMonthUseCase {
  workoutRepository: Repositories.WorkoutRepository;

  constructor(workoutRepository: Repositories.WorkoutRepository) {
    this.workoutRepository = workoutRepository;
  }

  async execute({ year, month }: { year: number; month: number }): Promise<Entities.Workout[]> {
    console.log(`usecase | getWorkoutsByMonth(${year}, ${month})`);
    return await this.workoutRepository.getWorkoutsByMonth(year, month);
  }
}

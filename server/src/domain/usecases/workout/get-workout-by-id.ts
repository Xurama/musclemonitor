import { Repositories, Entities } from "@/domain";


export interface GetWorkoutsByUserIdUseCase {
    execute: (userId: number) => Promise<Entities.Workout[]>;
  }
  
  export class GetWorkoutsByUserIdUseCaseImpl implements GetWorkoutsByUserIdUseCase {
    workoutRepository: Repositories.WorkoutRepository;
  
    constructor(workoutRepository: Repositories.WorkoutRepository) {
      this.workoutRepository = workoutRepository;
    }
  
    async execute(userId: number): Promise<Entities.Workout[]> {
      console.log(`usecase | getWorkoutsByUserId(${userId})`);
      return await this.workoutRepository.getWorkoutsByUserId(userId);
    }
  }
  
import { Repositories, Entities } from "@/domain";

export interface GetExerciseByIdUseCase {
  execute: (id: number) => Promise<Entities.Exercise | null>;
}

export class GetExerciseByIdUseCaseImpl implements GetExerciseByIdUseCase {
  exerciseRepository: Repositories.ExerciseRepository;

  constructor(exerciseRepository: Repositories.ExerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }

  async execute(id: number): Promise<Entities.Exercise | null> {
    return await this.exerciseRepository.getExerciseById(id);
  }
}

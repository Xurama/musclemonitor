import { Repositories, Entities } from "@/domain";

export interface CreateExerciseUseCase {
  execute: (exercise: Entities.Exercise) => Promise<Entities.Exercise>;
}

export class CreateExerciseUseCaseImpl implements CreateExerciseUseCase {
  exerciseRepository: Repositories.ExerciseRepository;

  constructor(exerciseRepository: Repositories.ExerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }

  async execute(exercise: Entities.Exercise): Promise<Entities.Exercise> {
    return await this.exerciseRepository.createExercise(exercise);
  }
}

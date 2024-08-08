import { Repositories, Entities } from "@/domain";

export interface CreateMuscleGroupUseCase {
  execute: (muscleGroup: Entities.MuscleGroup) => Promise<Entities.MuscleGroup>;
}

export class CreateMuscleGroupUseCaseImpl implements CreateMuscleGroupUseCase {
  muscleGroupRepository: Repositories.MuscleGroupRepository;

  constructor(muscleGroupRepository: Repositories.MuscleGroupRepository) {
    this.muscleGroupRepository = muscleGroupRepository;
  }

  async execute(muscleGroup: Entities.MuscleGroup): Promise<Entities.MuscleGroup> {
    return await this.muscleGroupRepository.createMuscleGroup(muscleGroup);
  }
}

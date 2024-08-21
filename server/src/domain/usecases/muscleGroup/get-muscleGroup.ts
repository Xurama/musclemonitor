import { Repositories, Entities } from "@/domain";

export interface GetMuscleGroupByIdUseCase {
  execute: (id: number) => Promise<Entities.MuscleGroup | null>;
}

export class GetMuscleGroupByIdUseCaseImpl implements GetMuscleGroupByIdUseCase {
  muscleGroupRepository: Repositories.MuscleGroupRepository;

  constructor(muscleGroupRepository: Repositories.MuscleGroupRepository) {
    this.muscleGroupRepository = muscleGroupRepository;
  }

  async execute(id: number): Promise<Entities.MuscleGroup | null> {
    console.log(`usecase | getMuscleGroupById(${id})`);
    return await this.muscleGroupRepository.getMuscleGroupById(id);
  }
}

import { Repositories, Entities } from "@/domain";


export interface GetMuscleGroupTypesUseCase {
  execute: () => Promise<Entities.MuscleGroupType[]>;
}

export class GetMuscleGroupTypesUseCaseImpl implements GetMuscleGroupTypesUseCase {
  muscleGroupTypeRepository: Repositories.MuscleGroupTypeRepository;

  constructor(muscleGroupTypeRepository: Repositories.MuscleGroupTypeRepository) {
    this.muscleGroupTypeRepository = muscleGroupTypeRepository;
  }

  async execute(): Promise<Entities.MuscleGroupType[]> {
    return await this.muscleGroupTypeRepository.getAllMuscleGroupTypes();
  }
}

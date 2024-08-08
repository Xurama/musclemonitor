import { Repositories, Entities } from "@/domain";

export interface GetUserByIdUseCase {
  execute: (id: number) => Promise<Entities.User | null>;
}

export class GetUserByIdUseCaseImpl implements GetUserByIdUseCase {
  userRepository: Repositories.UserRepository;

  constructor(userRepository: Repositories.UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: number): Promise<Entities.User | null> {
    return await this.userRepository.findById(id);
  }
}

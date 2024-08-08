import { Repositories, Entities } from "@/domain";

export interface CreateUserUseCase {
  execute: (user: Entities.User) => Promise<Entities.User>;
}

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  userRepository: Repositories.UserRepository;

  constructor(userRepository: Repositories.UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: Entities.User): Promise<Entities.User> {
    return await this.userRepository.createUser(user);
  }
}

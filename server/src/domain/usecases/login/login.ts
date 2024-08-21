// src/domain/usecases/LoginUserUseCase.ts
import { Repositories, Entities, Converters } from "@/domain";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export interface LoginUserUseCase {
  execute: (credentials: { username: string, password: string }) => Promise<{ token: string, user: Entities.User } | null>;
}

export class LoginUserUseCaseImpl implements LoginUserUseCase {
  userRepository: Repositories.UserRepository;

  constructor(userRepository: Repositories.UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(credentials: { username: string, password: string }): Promise<{ token: string, user: Entities.User } | null> {
    console.log(`usecase | getUserByUsername(${credentials.username}, ${credentials.password})`);
    const userDb = await this.userRepository.findByUsername(credentials.username);

    console.log(`usecase |post getUserByUsername => ${JSON.stringify(userDb, null, 2)}`);

    if (!userDb) {
      return null; // User not found
    }

    console.log(`usecase |pre isPasswordValid`);

    const isPasswordValid = await bcrypt.compare(credentials.password, userDb.password);
    if (!isPasswordValid) {
      return null; // Invalid password
    }

    console.log(`usecase |post isPasswordValid => ${isPasswordValid}`);

    const token = jwt.sign(
      { id: userDb.user_id, username: userDb.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    console.log(`usecase |post token`);

    console.log(`user pre converter ${JSON.stringify(userDb, null, 2)}`)

    const user = Converters.UserConverter.dbToDomain(userDb);

    console.log(`user post converter ${JSON.stringify(user, null, 2)}`)
    return { token, user };
  }
}

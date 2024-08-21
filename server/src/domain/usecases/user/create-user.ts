import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Repositories, Entities } from "@/domain";

export interface CreateUserUseCase {
  execute: (user: Entities.User) => Promise<{ token: string; user: Omit<Entities.User, 'password'> }>;
}

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  userRepository: Repositories.UserRepository;

  constructor(userRepository: Repositories.UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: Entities.User): Promise<{ token: string; user: Omit<Entities.User, 'password'> }> {
    console.log(`usecase | createUser(${user.username})`);

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { username: newUser.username, id: newUser.user_id },
      process.env.JWT_SECRET || 'default_secret', // Ensure you have a JWT_SECRET in your .env
      { expiresIn: '1h' }
    );

    return {
      token,
      user: {
        user_id: newUser.user_id,
        username: newUser.username,
      },
    };
  }
}

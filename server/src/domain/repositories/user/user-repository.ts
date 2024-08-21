import { Entities, Converters } from "@/domain";
import { MySQLDataSource, DataTypes } from "@/datasource";

export interface UserRepository {
  findByUsername: (username: string) => Promise<Entities.User | null>;
  createUser: (user: Entities.User) => Promise<Entities.User>;
  findById: (id: number) => Promise<Entities.User | null>;
}

export class UserRepositoryImpl implements UserRepository {
  mysqlDataSource: MySQLDataSource;

  constructor(mysqlDataSource: MySQLDataSource) {
    this.mysqlDataSource = mysqlDataSource;
  }

  async findById(id: number): Promise<Entities.User | null> {
    console.log(`repository | getUserById(${id})`);
    const userData = await this.mysqlDataSource.findUserById(id);
    return userData;
  }

  async findByUsername(username: string): Promise<Entities.User | null> {
    console.log(`repository | getUserByUsername(${username})`);
    const userData = await this.mysqlDataSource.findUserByUsername(username);
    console.log(`repository |post getUserByUsername => ${JSON.stringify(userData, null, 2)}`);
    return userData;
  }

  async createUser(user: Entities.User): Promise<Entities.User> {
    console.log(`repository | createUser(${user.username})`);
    const existingUser = await this.findByUsername(user.username);
    if (existingUser) {
      throw new Error("Username already taken");
    }

    // Insert the user and get the query result
    const result = await this.mysqlDataSource.insertUser(
      Converters.UserConverter.domainToDb(user)
    );

    // Return the user entity with the inserted ID
    return { ...user, user_id: result.insertId };
  }
}
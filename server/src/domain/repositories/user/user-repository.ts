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
    const userData = await this.mysqlDataSource.findUserById(id);
    return userData ? Converters.UserConverter.dbToDomain(userData) : null;
  }

  async findByUsername(username: string): Promise<Entities.User | null> {
    const userData = await this.mysqlDataSource.findUserByUsername(username);
    return userData ? Converters.UserConverter.dbToDomain(userData) : null;
  }

  async createUser(user: Entities.User): Promise<Entities.User> {
    const existingUser = await this.findByUsername(user.username);
    if (existingUser) {
      throw new Error("Username already taken");
    }
  
    const createdUserData = await this.mysqlDataSource.insertUser(
      Converters.UserConverter.domainToDb(user)
    );
    return { ...user, id: createdUserData.insertId };
  }
}

import { AllowedSchema } from "express-json-validator-middleware";
import { Entities } from "@/domain";
import { DataTypes } from "@/datasource";

export class UserConverter {
  static createSchema(): AllowedSchema {
    return {
      type: "object",
      required: ["username", "email", "password"],
      properties: {
        username: { type: "string", minLength: 1 },
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 }
      },
      additionalProperties: false
    };
  }

  static getSchema(): AllowedSchema {
    return {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "number" }
      },
      additionalProperties: false
    };
  }

  static domainToDb(user: Entities.User): DataTypes.UserDb {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password_hash: user.passwordHash
    };
  }

  static dbToDomain(user: DataTypes.UserDb): Entities.User {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      passwordHash: user.password_hash
    };
  }
}

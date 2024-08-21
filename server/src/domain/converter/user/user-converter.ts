// src/domain/converters/UserConverter.ts
import { AllowedSchema } from "express-json-validator-middleware";
import { Entities } from "@/domain";
import { DataTypes } from "@/datasource";

export class UserConverter {
  static createSchema(): AllowedSchema {
    return {
      type: "object",
      required: ["username", "password"],
      properties: {
        username: { type: "string", minLength: 1 },
        password: { type: "string", minLength: 6 }
      },
      additionalProperties: false
    };
  }

  static loginSchema(): AllowedSchema {
    return {
      type: "object",
      required: ["username", "password"],
      properties: {
        username: { type: "string", minLength: 1 },
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
      user_id: user.user_id,
      username: user.username,
      password: user.password
    };
  }

  static dbToDomain(user: DataTypes.UserDb): Entities.User {
    return {
      user_id: user.user_id,
      username: user.username,
      password: user.password
    };
  }
}

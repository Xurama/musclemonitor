import { AllowedSchema } from "express-json-validator-middleware";
import { Entities } from "@/domain";
import { DataTypes } from "@/datasource";

export class WorkoutConverter {
  static createSchema(): AllowedSchema {
    return {
      type: "object",
      required: ["userId", "date", "cardio", "notes"],
      properties: {
        userId: { type: "number" },
        date: { type: "string", format: "date" },
        cardio: { type: "boolean" },
        notes: { type: "string" }
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

  static domainToDb(workout: Entities.Workout): DataTypes.WorkoutDb {
    return {
      id: workout.id,
      user_id: workout.userId,
      date: workout.date,
      cardio: workout.cardio,
      notes: workout.notes
    };
  }

  static dbToDomain(workout: DataTypes.WorkoutDb): Entities.Workout {
    return {
      id: workout.id,
      userId: workout.user_id,
      date: workout.date,
      cardio: workout.cardio,
      notes: workout.notes
    };
  }
}

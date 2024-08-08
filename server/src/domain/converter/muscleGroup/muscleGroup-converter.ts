import { AllowedSchema } from "express-json-validator-middleware";
import { Entities } from "@/domain";
import { DataTypes } from "@/datasource";

export class MuscleGroupConverter {
  static createSchema(): AllowedSchema {
    return {
      type: "object",
      required: ["workoutId", "name"],
      properties: {
        workoutId: { type: "number" },
        name: { type: "string" }
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

  static domainToDb(muscleGroup: Entities.MuscleGroup): DataTypes.MuscleGroupDb {
    return {
      workout_id: muscleGroup.workoutId,
      name: muscleGroup.name
    };
  }

  static dbToDomain(muscleGroup: DataTypes.MuscleGroupDb): Entities.MuscleGroup {
    return {
      id: muscleGroup.id,
      workoutId: muscleGroup.workout_id,
      name: muscleGroup.name
    };
  }
}

import { AllowedSchema } from "express-json-validator-middleware";
import { Entities } from "@/domain";
import { DataTypes } from "@/datasource";

export class ExerciseConverter {
  static createSchema(): AllowedSchema {
    return {
      type: "object",
      required: ["workoutId", "name", "sets", "reps", "weight", "rest_time"],
      properties: {
        workoutId: { type: "number" },
        name: { type: "string" },
        sets: { type: "number" },
        reps: { type: "number" },
        weight: { type: "number" },
        rest_time: { type: "number" }
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

  static domainToDb(exercise: Entities.Exercise): DataTypes.ExerciseDb {
    return {
      workoutId: exercise.workoutId,
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      rest_time: exercise.rest_time
    };
  }

  static dbToDomain(exercise: DataTypes.ExerciseDb): Entities.Exercise {
    return {
      id: exercise.id,
      workoutId: exercise.workoutId,
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      rest_time: exercise.rest_time
    };
  }
}

import { AllowedSchema } from "express-json-validator-middleware";
import { Entities } from "@/domain";
import { DataTypes } from "@/datasource";

export class ExerciseConverter {
  static createSchema(): AllowedSchema {
    return {
      type: "object",
      required: ["workoutId", "name", "sets", "reps", "weight", "restTime"],
      properties: {
        workoutId: { type: "number" },
        name: { type: "string" },
        sets: { type: "number" },
        reps: { type: "number" },
        weight: { type: "number" },
        restTime: { type: "number" }
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
      workout_id: exercise.workoutId,
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      rest_time: exercise.restTime
    };
  }

  static dbToDomain(exercise: DataTypes.ExerciseDb): Entities.Exercise {
    return {
      id: exercise.id,
      workoutId: exercise.workout_id,
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      restTime: exercise.rest_time
    };
  }
}

import { AllowedSchema } from "express-json-validator-middleware";
import { Entities } from "@/domain";
import { DataTypes } from "@/datasource";

export class WorkoutConverter {
  static createSchema(): AllowedSchema {
    return {
      type: "object",
      required: ["userId", "date", "cardio"],
      properties: {
        userId: { type: "number" },
        date: { type: "string" },
        cardio: { type: "boolean" },
        name: { type: "string" },
        exercises: {
          type: "array",
          items: {
            type: "object",
            required: ["name", "sets", "reps"],
            properties: {
              name: { type: "string" },
              sets: { type: "number" },
              reps: {
                type: "array",
                items: {
                  type: "number",
                },
              },
              weight: {
                type: "array",
                items: {
                  type: "number",
                },
              },
              rest_time: {
                type: "array",
                items: {
                  type: "number",
                },
              },
            },
          },
        },
        muscle_groups: {
          type: "array",
          items: {
            type: "object",
            required: ["name"],
            properties: {
              name: { type: "string" },
            },
          },
        },
        cardio_exercises: {
          type: "array",
          items: {
            type: "object",
            required: ["name", "activity_time"],
            properties: {
              name: { type: "string" },
              activity_time: { type: "number" },
              notes: { type: "string" },
            },
          },
        },
      },
      additionalProperties: false,
    };
  }

  static getSchema(): AllowedSchema {
    return {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "number" },
      },
      additionalProperties: false,
    };
  }

  static domainToDb(workout: Entities.Workout): DataTypes.WorkoutDb {
    return {
      id: workout.id,
      userId: workout.userId,
      date: workout.date,
      cardio: workout.cardio,
      name: workout.name,
      exercises: workout.exercises,
      muscle_groups: workout.muscle_groups,
      cardio_exercises: workout.cardio_exercises.map((exercise) => ({
        ...exercise,
        workoutId: workout.id, // Ajouter l'ID du workout
      })),
    };
  }

  static dbToDomain(workoutDb: DataTypes.WorkoutDb): Entities.Workout {
    return {
      id: workoutDb.id,
      userId: workoutDb.userId,
      date: workoutDb.date,
      cardio: workoutDb.cardio,
      name: workoutDb.name,
      exercises: workoutDb.exercises.map((exercise: any) => ({
        name: exercise.name,
        workoutId: workoutDb.id, 
        sets: exercise.sets,
        reps: exercise.reps, // Handle arrays for multiple sets
        weight: exercise.weight,
        rest_time: exercise.rest_time,
      })) || [],
      muscle_groups: workoutDb.muscle_groups.map((muscleGroup: any) => ({
        name: muscleGroup.name,
      })) || [],
      cardio_exercises: workoutDb.cardio_exercises.map((exercise: any) => ({
        name: exercise.name,
        workoutId: workoutDb.id, 
        activity_time: exercise.activity_time,
        notes: exercise.notes,
      })) || [],
    };
  }
}

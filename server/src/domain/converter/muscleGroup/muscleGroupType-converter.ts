import { AllowedSchema } from "express-json-validator-middleware";

export class MuscleGroupTypeConverter {
  static getSchema(): AllowedSchema {
    return {
      type: "object",
      required: ["muscle_group_type_id", "name"],
      properties: {
        muscle_group_type_id: { type: "number" },
        name: { type: "string" }
      },
      additionalProperties: false
    };
  }
}
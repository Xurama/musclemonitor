import express, { Router, Request, Response } from "express";
import { Validator } from "express-json-validator-middleware";
import { Converters } from "@/domain";
import { RouterUtils } from "@/presentation/utils";
import { UseCases } from "@/presentation";

export default function WorkoutRouter(useCases: UseCases): Router {
  const { validate } = new Validator({});

  // Route pour créer une nouvelle séance d'entraînement
  const createWorkout = async (req: Request, res: Response) => {
    try {
      const { userId, date, cardio, notes } = req.body;
      const response = await useCases.createWorkoutUseCase.execute({ userId, date, cardio, notes });
      return RouterUtils.created(res, response);
    } catch (error) {
      return RouterUtils.error(error, res);
    }
  };

  // Route pour récupérer une séance d'entraînement par ID
  const getWorkoutById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const response = await useCases.getWorkoutByIdUseCase.execute(id);
      return RouterUtils.ok(res, response);
    } catch (error) {
      return RouterUtils.error(error, res);
    }
  };

  const workoutRouter = express.Router({ mergeParams: true });

  workoutRouter.post(
    "/",
    validate({ body: Converters.WorkoutConverter.createSchema() }),
    createWorkout
  );

  workoutRouter.get(
    "/:id",
    validate({ params: Converters.WorkoutConverter.getSchema() }),
    getWorkoutById
  );

  return workoutRouter;
}

import express, { Router, Request, Response } from "express";
import { Validator } from "express-json-validator-middleware";
import { Converters } from "@/domain";
import { RouterUtils } from "@/presentation/utils";
import { UseCases } from "@/presentation";

export default function ExerciseRouter(useCases: UseCases): Router {
  const { validate } = new Validator({});

  // Route pour créer un nouvel exercice
  const createExercise = async (req: Request, res: Response) => {
    try {
      console.log(`router | createExercise()`);
      const { workoutId, name, sets, reps, weight, rest_time } = req.body;
      const response = await useCases.createExerciseUseCase.execute({ workoutId, name, sets, reps, weight, rest_time });
      return RouterUtils.created(res, response);
    } catch (error) {
      return RouterUtils.error(error, res);
    }
  };

  // Route pour récupérer un exercice par ID
  const getExerciseById = async (req: Request, res: Response) => {
    try {
      console.log(`router | getExerciseById()`);
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
          return RouterUtils.badRequest(res);
        }
      const response = await useCases.getExerciseByIdUseCase.execute(id);
      return RouterUtils.ok(res, response);
    } catch (error) {
      return RouterUtils.error(error, res);
    }
  };

  const exerciseRouter = express.Router({ mergeParams: true });

  exerciseRouter.post(
    "/",
    validate({ body: Converters.ExerciseConverter.createSchema() }),
    createExercise
  );

  exerciseRouter.get(
    "/:id",
    validate({ params: Converters.ExerciseConverter.getSchema() }),
    getExerciseById
  );

  return exerciseRouter;
}

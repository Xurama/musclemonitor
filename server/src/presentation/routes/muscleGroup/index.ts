import express, { Router, Request, Response } from "express";
import { Validator } from "express-json-validator-middleware";
import { Converters } from "@/domain";
import { RouterUtils } from "@/presentation/utils";
import { UseCases } from "@/presentation";

export default function MuscleGroupRouter(useCases: UseCases): Router {
  const { validate } = new Validator({});

  // Route pour créer un nouveau groupe musculaire
  const createMuscleGroup = async (req: Request, res: Response) => {
    try {
      const { workoutId, name } = req.body;
      const response = await useCases.createMuscleGroupUseCase.execute({ workoutId, name });
      return RouterUtils.created(res, response);
    } catch (error) {
      return RouterUtils.error(error, res);
    }
  };

  // Route pour récupérer un groupe musculaire par ID
  const getMuscleGroupById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const response = await useCases.getMuscleGroupByIdUseCase.execute(id);
      return RouterUtils.ok(res, response);
    } catch (error) {
      return RouterUtils.error(error, res);
    }
  };

  const muscleGroupRouter = express.Router({ mergeParams: true });

  muscleGroupRouter.post(
    "/",
    validate({ body: Converters.MuscleGroupConverter.createSchema() }),
    createMuscleGroup
  );

  muscleGroupRouter.get(
    "/:id",
    validate({ params: Converters.MuscleGroupConverter.getSchema() }),
    getMuscleGroupById
  );

  return muscleGroupRouter;
}

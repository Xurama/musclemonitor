import express, { Router, Request, Response, RequestHandler } from "express";
import { Validator } from "express-json-validator-middleware";
import { Converters } from "@/domain";
import { RouterUtils } from "@/presentation/utils";
import { UseCases } from "@/presentation";

export default function WorkoutRouter(useCases: UseCases): Router {
  const { validate } = new Validator({});

  // Route pour créer une nouvelle séance d'entraînement
  const createWorkout = async (req: Request, res: Response) => {
    try {
      console.log(`router | createWorkout()`);

      // Déstructuration du corps de la requête
      const {
        workout_id,
        userId,
        date,
        cardio,
        name,
        exercises,
        muscle_groups,
        cardio_exercises = [],
      } = req.body;

      // Appel à la méthode de création avec l'objet complet
      const response = await useCases.createWorkoutUseCase.execute({
        workout_id,
        userId,
        date,
        cardio,
        name,
        exercises,
        muscle_groups,
        cardio_exercises, // Assurez-vous que cardio_exercises est inclus
      });

      return RouterUtils.created(res, response);
    } catch (error) {
      return RouterUtils.error(error, res);
    }
  };

  // Route pour récupérer une séance d'entraînement par ID
  const getWorkoutById = async (req: Request, res: Response) => {
    try {
      console.log(`router | getWorkoutById()`);
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return RouterUtils.badRequest(res);
      }
      const response = await useCases.getWorkoutByIdUseCase.execute(id);
      return RouterUtils.ok(res, response);
    } catch (error) {
      return RouterUtils.error(error, res);
    }
  };

  // Route pour récupérer les types de groupes musculaires
  const getMuscleGroupTypes = async (req: Request, res: Response) => {
    try {
      console.log(`router | getMuscleGroupTypes()`);
      const muscleGroupTypes = await useCases.muscleGroupType.execute();
      return RouterUtils.ok(res, muscleGroupTypes);
    } catch (error) {
      console.log("error");
      return RouterUtils.error(error, res);
    }
  };

  const getWorkoutsByMonth = async (req: Request, res: Response) => {
    try {
      console.log(`router | getWorkoutsByMonth()`);
      const year = parseInt(req.query.year as string, 10);
      const month = parseInt(req.query.month as string, 10);

      if (isNaN(year) || isNaN(month)) {
        return RouterUtils.badRequest(res);
      }

      const response = await useCases.getMonthWorkoutDataUsecase.execute({
        year,
        month,
      });
      return RouterUtils.ok(res, response);
    } catch (error) {
      return RouterUtils.error(error, res);
    }
  };
  
  const getWorkoutByName = async (req: Request, res: Response) => {
    try {
      console.log(`router | getWorkoutByName()`);
      const name = req.query.name as string;

      if (!name) {
        return RouterUtils.badRequest(res);
      }

      const response = await useCases.getWorkoutByNameUseCase.execute(name);
      return RouterUtils.ok(res, response);
    } catch (error) {
      return RouterUtils.error(error, res);
    }
  };

  const getWorkoutsByUserId = async (req: Request, res: Response) => {
    try {
      console.log(`router | getWorkoutsByUserId()`);
      const userId = parseInt(req.query.userId as string, 10);
      if (isNaN(userId)) {
        return RouterUtils.badRequest(res);
      }
  
      const response = await useCases.getWorkoutsByUserIdUseCase.execute(userId);
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

  // Ajoutez ici la route pour récupérer les types de groupes musculaires
  workoutRouter.get(
    "/muscle-group-types",
    getMuscleGroupTypes as RequestHandler
  );

  workoutRouter.get("/month", getWorkoutsByMonth);

  workoutRouter.get("/name", getWorkoutByName); // Added this line

  workoutRouter.get("/last", getWorkoutsByUserId);

  workoutRouter.get(
    "/:id",
    validate({ params: Converters.WorkoutConverter.getSchema() }),
    getWorkoutById
  );

  return workoutRouter;
}

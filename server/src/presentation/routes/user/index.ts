import express, { Router, Request, Response } from "express";
import { Validator } from "express-json-validator-middleware";
import { Converters } from "@/domain";
import { RouterUtils } from "@/presentation/utils";
import { UseCases } from "@/presentation";

export default function UserRouter(useCases: UseCases): Router {
  const { validate } = new Validator({});

  // Route pour créer un nouvel utilisateur
  const createUser = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const response = await useCases.createUserUseCase.execute({ username, email, password });
      return RouterUtils.created(res, response);
    } catch (error) {
      return RouterUtils.error(error, res);
    }
  };

  // Route pour récupérer les détails d'un utilisateur par son ID
  const getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const response = await useCases.getUserByIdUseCase.execute(id);
      return RouterUtils.ok(res, response);
    } catch (error) {
      return RouterUtils.error(error, res);
    }
  };

  const userRouter = express.Router({ mergeParams: true });

  userRouter.post(
    "/",
    validate({ body: Converters.UserConverter.createSchema() }),
    createUser
  );

  userRouter.get(
    "/:id",
    validate({ params: Converters.UserConverter.getSchema() }),
    getUserById
  );

  return userRouter;
}

import express, { Router, Request, Response } from 'express';
import { Validator } from 'express-json-validator-middleware';
import { Converters } from '@/domain';
import { RouterUtils } from '@/presentation/utils';
import { UseCases } from '@/presentation';

export default function UserRouter(useCases: UseCases): Router {
  const { validate } = new Validator({});

  // Login user
  const loginUser = async (req: Request, res: Response) => {
    try {
      console.log('router | loginUser()');
      const { username, password } = req.body;
      const response = await useCases.loginUserUseCase.execute({ username, password });

      if (!response) {
        return RouterUtils.error('Invalid username or password', res);
      }

      return RouterUtils.ok(res, response);
    } catch (error) {
      return RouterUtils.error('Login failed', res);
    }
  };

  // Create user (Register)
  const createUser = async (req: Request, res: Response) => {
    try {
      console.log('router | createUser()');
      const { username, password } = req.body;
      const response = await useCases.createUserUseCase.execute({ username, password });
      return RouterUtils.created(res, response);
    } catch (error) {
      return RouterUtils.error(error.message, res);
    }
  };

  // Get user by ID
  const getUserById = async (req: Request, res: Response) => {
    try {
      console.log('router | getUserById()');
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return RouterUtils.badRequest(res);
      }
      const response = await useCases.getUserByIdUseCase.execute(id);
      return RouterUtils.ok(res, response);
    } catch (error) {
      return RouterUtils.error(error.message, res);
    }
  };

  const userRouter = express.Router({ mergeParams: true });

  userRouter.post('/', validate({ body: Converters.UserConverter.createSchema() }), createUser);
  userRouter.post('/login', validate({ body: Converters.UserConverter.loginSchema() }), loginUser);
  userRouter.get('/:id', validate({ params: Converters.UserConverter.getSchema() }), getUserById);

  return userRouter;
}

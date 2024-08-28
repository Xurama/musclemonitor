import express, { Router } from "express";
import * as routers from "./routes";
import { Repositories, UseCases } from "@/domain";
import * as datasources from "@/datasource";

export type DataSources = {
  mysqlDataSource: datasources.MySQLDataSource;
};

export type Repositories = {
  userRepository: Repositories.UserRepository;
  workoutRepository: Repositories.WorkoutRepository;
  exerciseRepository: Repositories.ExerciseRepository;
  muscleGroupRepository: Repositories.MuscleGroupRepository;
  muscleGroupTypeRepository: Repositories.MuscleGroupTypeRepository;
};

export type UseCases = {
  createUserUseCase: UseCases.CreateUserUseCase;
  getUserByIdUseCase: UseCases.GetUserByIdUseCase;
  createWorkoutUseCase: UseCases.CreateWorkoutUseCase;
  getWorkoutByIdUseCase: UseCases.GetWorkoutByIdUseCase;
  createExerciseUseCase: UseCases.CreateExerciseUseCase;
  getExerciseByIdUseCase: UseCases.GetExerciseByIdUseCase;
  createMuscleGroupUseCase: UseCases.CreateMuscleGroupUseCase;
  getMuscleGroupByIdUseCase: UseCases.GetMuscleGroupByIdUseCase;
  loginUserUseCase: UseCases.LoginUserUseCase;
  muscleGroupType: UseCases.GetMuscleGroupTypesUseCase;
  getMonthWorkoutDataUsecase: UseCases.GetWorkoutsByMonthUseCase;
  getWorkoutByNameUseCase: UseCases.GetWorkoutByNameUseCase;
  getWorkoutsByUserIdUseCase: UseCases.GetWorkoutsByUserIdUseCase;
};

class RouterInjector {
  static initDataSources(): DataSources {
    return {
      mysqlDataSource: new datasources.MySQLDataSourceImpl(),
    };
  }

  static initRepositories(dataSources: DataSources): Repositories {
    return {
      userRepository: new Repositories.UserRepositoryImpl(dataSources.mysqlDataSource),
      workoutRepository: new Repositories.WorkoutRepositoryImpl(dataSources.mysqlDataSource),
      exerciseRepository: new Repositories.ExerciseRepositoryImpl(dataSources.mysqlDataSource),
      muscleGroupRepository: new Repositories.MuscleGroupRepositoryImpl(dataSources.mysqlDataSource),
      muscleGroupTypeRepository: new Repositories.MuscleGroupTypeRepositoryImpl(dataSources.mysqlDataSource)
    };
  }

  static initUseCases(repositories: Repositories): UseCases {
    return {
      createUserUseCase: new UseCases.CreateUserUseCaseImpl(repositories.userRepository),
      getUserByIdUseCase: new UseCases.GetUserByIdUseCaseImpl(repositories.userRepository),
      createWorkoutUseCase: new UseCases.CreateWorkoutUseCaseImpl(repositories.workoutRepository),
      getWorkoutByIdUseCase: new UseCases.GetWorkoutByIdUseCaseImpl(repositories.workoutRepository),
      createExerciseUseCase: new UseCases.CreateExerciseUseCaseImpl(repositories.exerciseRepository),
      getExerciseByIdUseCase: new UseCases.GetExerciseByIdUseCaseImpl(repositories.exerciseRepository),
      createMuscleGroupUseCase: new UseCases.CreateMuscleGroupUseCaseImpl(repositories.muscleGroupRepository),
      getMuscleGroupByIdUseCase: new UseCases.GetMuscleGroupByIdUseCaseImpl(repositories.muscleGroupRepository),
      loginUserUseCase: new UseCases.LoginUserUseCaseImpl(repositories.userRepository),
      muscleGroupType: new UseCases.GetMuscleGroupTypesUseCaseImpl(repositories.muscleGroupTypeRepository),
      getMonthWorkoutDataUsecase: new UseCases.GetWorkoutsByMonthUseCaseImpl(repositories.workoutRepository),
      getWorkoutByNameUseCase: new UseCases.GetWorkoutByNameUseCaseImpl(repositories.workoutRepository),
      getWorkoutsByUserIdUseCase: new UseCases.GetWorkoutsByUserIdUseCaseImpl(repositories.workoutRepository)
    };
  }

  static inject(useCases: UseCases): Router {
    const router = express.Router();
    router.use("/users", routers.UserRouter(useCases));
    router.use("/workouts", routers.WorkoutRouter(useCases));
    router.use("/exercises", routers.ExerciseRouter(useCases));
    router.use("/muscle-groups", routers.MuscleGroupRouter(useCases));
    return router;
  }
}

export default RouterInjector;

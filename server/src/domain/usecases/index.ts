// Importations pour les exercices
import {
    CreateExerciseUseCase,
    CreateExerciseUseCaseImpl
  } from "@/domain/usecases/exercise/create-exercise";
  
  import {
    GetExerciseByIdUseCase,
    GetExerciseByIdUseCaseImpl
  } from "@/domain/usecases/exercise/get-exercise";
  
  // Importations pour les groupes musculaires
  import {
    CreateMuscleGroupUseCase,
    CreateMuscleGroupUseCaseImpl
  } from "@/domain/usecases/muscleGroup/create-muscleGroup";
  
  import {
    GetMuscleGroupByIdUseCase,
    GetMuscleGroupByIdUseCaseImpl
  } from "@/domain/usecases/muscleGroup/get-muscleGroup";
  
  // Importations pour les utilisateurs
  import {
    CreateUserUseCase,
    CreateUserUseCaseImpl
  } from "@/domain/usecases/user/create-user";
  
  import {
    GetUserByIdUseCase,
    GetUserByIdUseCaseImpl
  } from "@/domain/usecases/user/get-user";
  
  // Importations pour les séances d'entraînement
  import {
    CreateWorkoutUseCase,
    CreateWorkoutUseCaseImpl
  } from "@/domain/usecases/workout/create-workout";
  
  import {
    GetWorkoutByIdUseCase,
    GetWorkoutByIdUseCaseImpl
  } from "@/domain/usecases/workout/get-workout";

  import {
    GetWorkoutByNameUseCase,
    GetWorkoutByNameUseCaseImpl
  } from "@/domain/usecases/workout/get-workout-name";

  import {
    LoginUserUseCase,
    LoginUserUseCaseImpl
  } from "@/domain/usecases/login/login";

  import {
    GetMuscleGroupTypesUseCase,
    GetMuscleGroupTypesUseCaseImpl
  } from "@/domain/usecases/muscleGroup/get-muscleGroupType";

  import {
    GetWorkoutsByMonthUseCase,
    GetWorkoutsByMonthUseCaseImpl
  } from "@/domain/usecases/workout/get-month-workouts";

  import {
    GetWorkoutsByUserIdUseCase,
    GetWorkoutsByUserIdUseCaseImpl
  } from "@/domain/usecases/workout/get-workout-by-id";
  
  // Exportation des cas d'utilisation et de leurs implémentations
  export {
    CreateExerciseUseCase,
    CreateExerciseUseCaseImpl,
    GetExerciseByIdUseCase,
    GetExerciseByIdUseCaseImpl,
    CreateMuscleGroupUseCase,
    CreateMuscleGroupUseCaseImpl,
    GetMuscleGroupByIdUseCase,
    GetMuscleGroupByIdUseCaseImpl,
    CreateUserUseCase,
    CreateUserUseCaseImpl,
    GetUserByIdUseCase,
    GetUserByIdUseCaseImpl,
    CreateWorkoutUseCase,
    CreateWorkoutUseCaseImpl,
    GetWorkoutByIdUseCase,
    GetWorkoutByIdUseCaseImpl,
    LoginUserUseCase,
    LoginUserUseCaseImpl,
    GetMuscleGroupTypesUseCase,
    GetMuscleGroupTypesUseCaseImpl,
    GetWorkoutsByMonthUseCase,
    GetWorkoutsByMonthUseCaseImpl,
    GetWorkoutByNameUseCase,
    GetWorkoutByNameUseCaseImpl,
    GetWorkoutsByUserIdUseCase,
    GetWorkoutsByUserIdUseCaseImpl
  };
  
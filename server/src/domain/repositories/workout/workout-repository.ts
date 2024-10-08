import { Entities, Converters } from "@/domain";
import { MySQLDataSource, DataTypes } from "@/datasource";

export interface WorkoutRepository {
  createWorkout: (workout: Entities.Workout) => Promise<Entities.Workout>;
  getWorkoutById: (id: number) => Promise<Entities.Workout | null>;
  getWorkoutsByMonth: (year: number, month: number) => Promise<Entities.Workout[]>;
  getWorkoutByName: (name: string) => Promise<Entities.Workout | null>;
  getWorkoutsByUserId: (userId: number) => Promise<Entities.Workout[]>;
}

export class WorkoutRepositoryImpl implements WorkoutRepository {
  mysqlDataSource: MySQLDataSource;

  constructor(mysqlDataSource: MySQLDataSource) {
    this.mysqlDataSource = mysqlDataSource;
  }

  async createWorkout(workout: Entities.Workout): Promise<Entities.Workout> {
    console.log(`repository | getWorkoutById(${JSON.stringify(workout)})`);
    const workoutDb = Converters.WorkoutConverter.domainToDb(workout);
    const result = await this.mysqlDataSource.insertWorkout(workoutDb);

    const workoutId = result.workout_id;

    return { ...workout, workout_id: workoutId };
  }

  async getWorkoutById(id: number): Promise<Entities.Workout | null> {
    console.log(`repository | getWorkoutById(${id})`);
    const workoutData = await this.mysqlDataSource.findWorkoutById(id);
    return workoutData ? Converters.WorkoutConverter.dbToDomain(workoutData) : null;
  }

  async getWorkoutsByMonth(year: number, month: number): Promise<Entities.Workout[]> {
    console.log(`repository | getWorkoutsByMonth(${year}, ${month})`);
    const workoutData = await this.mysqlDataSource.findWorkoutsByMonth(year, month);
    console.log("workoutData", JSON.stringify(workoutData));
    return workoutData.map(Converters.WorkoutConverter.dbToDomain);
  }

  async getWorkoutByName(name: string): Promise<Entities.Workout | null> {
    console.log(`repository | getWorkoutByName(${name})`);
    const workoutData = await this.mysqlDataSource.findWorkoutByName(name);
    console.log(`repository | getWorkoutByName(${name} :`, JSON.stringify(workoutData));
    return workoutData ? Converters.WorkoutConverter.dbToDomain(workoutData) : null;
  }

  async getWorkoutsByUserId(userId: number): Promise<Entities.Workout[]> {
    console.log(`repository | getWorkoutsByUserId(${userId})`);
    const workoutData = await this.mysqlDataSource.findWorkoutsByUserId(userId);
    return workoutData.map(Converters.WorkoutConverter.dbToDomain);
  }
}
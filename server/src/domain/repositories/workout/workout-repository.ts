import { Entities, Converters } from "@/domain";
import { MySQLDataSource, DataTypes } from "@/datasource";

export interface WorkoutRepository {
  createWorkout: (workout: Entities.Workout) => Promise<Entities.Workout>;
  getWorkoutById: (id: number) => Promise<Entities.Workout | null>;
}

export class WorkoutRepositoryImpl implements WorkoutRepository {
  mysqlDataSource: MySQLDataSource;

  constructor(mysqlDataSource: MySQLDataSource) {
    this.mysqlDataSource = mysqlDataSource;
  }

  async createWorkout(workout: Entities.Workout): Promise<Entities.Workout> {
    const workoutDb = Converters.WorkoutConverter.domainToDb(workout);
    const result = await this.mysqlDataSource.insertWorkout(workoutDb);
    return { ...workout, id: result.insertId };
  }

  async getWorkoutById(id: number): Promise<Entities.Workout | null> {
    const workoutData = await this.mysqlDataSource.findWorkoutById(id);
    return workoutData ? Converters.WorkoutConverter.dbToDomain(workoutData) : null;
  }
}

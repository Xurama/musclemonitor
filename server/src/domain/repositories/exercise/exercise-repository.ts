import { Entities, Converters } from "@/domain";
import { MySQLDataSource, DataTypes } from "@/datasource";

export interface ExerciseRepository {
  createExercise: (exercise: Entities.Exercise) => Promise<Entities.Exercise>;
  getExerciseById: (id: number) => Promise<Entities.Exercise | null>;
}

export class ExerciseRepositoryImpl implements ExerciseRepository {
  mysqlDataSource: MySQLDataSource;

  constructor(mysqlDataSource: MySQLDataSource) {
    this.mysqlDataSource = mysqlDataSource;
  }

  async createExercise(exercise: Entities.Exercise): Promise<Entities.Exercise> {
    const exerciseDb = Converters.ExerciseConverter.domainToDb(exercise);
    const result = await this.mysqlDataSource.insertExercise(exerciseDb);
    return { ...exercise, id: result.insertId };
  }

  async getExerciseById(id: number): Promise<Entities.Exercise | null> {
    const exerciseData = await this.mysqlDataSource.findExerciseById(id);
    return exerciseData ? Converters.ExerciseConverter.dbToDomain(exerciseData) : null;
  }
}

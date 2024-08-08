import { Entities, Converters } from "@/domain";
import { MySQLDataSource, DataTypes } from "@/datasource";

export interface MuscleGroupRepository {
  createMuscleGroup: (muscleGroup: Entities.MuscleGroup) => Promise<Entities.MuscleGroup>;
  getMuscleGroupById: (id: number) => Promise<Entities.MuscleGroup | null>;
}

export class MuscleGroupRepositoryImpl implements MuscleGroupRepository {
  mysqlDataSource: MySQLDataSource;

  constructor(mysqlDataSource: MySQLDataSource) {
    this.mysqlDataSource = mysqlDataSource;
  }

  async createMuscleGroup(muscleGroup: Entities.MuscleGroup): Promise<Entities.MuscleGroup> {
    const muscleGroupDb = Converters.MuscleGroupConverter.domainToDb(muscleGroup);
    const result = await this.mysqlDataSource.insertMuscleGroup(muscleGroupDb);
    return { ...muscleGroup, id: result.insertId };
  }

  async getMuscleGroupById(id: number): Promise<Entities.MuscleGroup | null> {
    const muscleGroupData = await this.mysqlDataSource.findMuscleGroupById(id);
    return muscleGroupData ? Converters.MuscleGroupConverter.dbToDomain(muscleGroupData) : null;
  }
}

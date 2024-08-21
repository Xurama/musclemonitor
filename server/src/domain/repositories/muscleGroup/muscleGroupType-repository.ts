import { Entities, Converters } from "@/domain";
import { MySQLDataSource, DataTypes } from "@/datasource";

export interface MuscleGroupTypeRepository {
    getAllMuscleGroupTypes: () => Promise<Entities.MuscleGroupType[]>;
  }
  
export class MuscleGroupTypeRepositoryImpl implements MuscleGroupTypeRepository {
  mysqlDataSource: MySQLDataSource;

  constructor(mysqlDataSource: MySQLDataSource) {
    this.mysqlDataSource = mysqlDataSource;
  }

  async getAllMuscleGroupTypes(): Promise<Entities.MuscleGroupType[]> {
    const muscleGroupTypes = await this.mysqlDataSource.getAllMuscleGroupTypes();
    return muscleGroupTypes.map((type) => ({
      muscle_group_type_id: type.muscle_group_type_id,
      name: type.name,
    }));
  }
}

  
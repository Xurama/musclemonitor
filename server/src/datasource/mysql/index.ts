import { DataTypes } from "@/datasource";
import { Entities } from "@/domain";
import Builder from "./builder";

export interface MySQLDataSource {
  // User methods
  findUserByUsername(username: string): Promise<DataTypes.UserDb | null>;
  insertUser(user: DataTypes.UserDb): Promise<DataTypes.QueryResult>;
  findUserById(id: number): Promise<DataTypes.UserDb | null>;

  // Workout methods
  insertWorkout(workout: Entities.Workout): Promise<DataTypes.WorkoutDb>;
  findWorkoutById(id: number): Promise<DataTypes.WorkoutDb | null>;

  // Exercise methods
  insertExercise(exercise: Entities.Exercise): Promise<DataTypes.QueryResult>;
  findExerciseById(id: number): Promise<DataTypes.ExerciseDb | null>;

  // MuscleGroup methods
  insertMuscleGroup(
    muscleGroup: Entities.MuscleGroup
  ): Promise<DataTypes.QueryResult>;
  findMuscleGroupById(id: number): Promise<DataTypes.MuscleGroupDb | null>;

  insertCardioExercise(
    cardioExercise: DataTypes.CardioExerciseDb
  ): Promise<DataTypes.QueryResult>;

  getAllMuscleGroupTypes(): Promise<DataTypes.MuscleGroupTypeDb[]>;

  findWorkoutsByMonth(
    year: number,
    month: number
  ): Promise<DataTypes.WorkoutDb[]>;

  findWorkoutByName(name: string): Promise<DataTypes.WorkoutDb | null>;

  findWorkoutsByUserId(userId: number): Promise<DataTypes.WorkoutDb[]>;
}

export class MySQLDataSourceImpl implements MySQLDataSource {
  // User methods
  async findUserByUsername(username: string): Promise<DataTypes.UserDb | null> {
    console.log(`datasource | getUserbyUsername(${username})`);
    try {
      const connection = await Builder.db();
      const [rows] = await connection.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      if (rows.length > 0) {
        return rows[0];
      }
    } catch (error) {
      console.error("Database query failed:", error);
      throw error;
    }
  }

  async insertUser(user: DataTypes.UserDb): Promise<DataTypes.QueryResult> {
    console.log(`datasource | createUser(${user})`);
    const connection = await Builder.db();
    const [result] = await connection.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [user.username, user.password]
    );

    return result as DataTypes.QueryResult; // Ensuring correct return type that includes insertId
  }

  async findUserById(id: number): Promise<DataTypes.UserDb | null> {
    console.log(`datasource | getUserbyId(${id})`);
    const connection = await Builder.db();
    const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);

    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  }

  // Workout methods
  async insertWorkout(workout: Entities.Workout): Promise<DataTypes.WorkoutDb> {
    console.log(`datasource | createWorkout(${JSON.stringify(workout)})`);

    try {
      const connection = await Builder.db();
      const [result] = await connection.query(
        "INSERT INTO workouts (user_id, date, cardio, name) VALUES (?, ?, ?, ?)",
        [workout.userId, workout.date, workout.cardio, workout.name]
      );

      const workoutId = result.insertId;

      // Ajout des exercices associés au workout
      for (const exercise of workout.exercises) {
        await this.insertExercise({
          workoutId: workoutId,
          ...exercise,
        });
      }

      // Ajout des groupes musculaires associés au workout
      for (const muscleGroup of workout.muscle_groups) {
        await this.insertMuscleGroup({
          workoutId: workoutId,
          ...muscleGroup,
        });
      }

      // Ajout des exercices cardio associés au workout
      const cardioExercises = [];
      for (const cardioExercise of workout.cardio_exercises) {
        const result = await this.insertCardioExercise({
          workoutId: workoutId,
          name: cardioExercise.name,
          activity_time: cardioExercise.activity_time,
          notes: cardioExercise.notes,
        });
        cardioExercises.push({
          id: result.insertId,
          workoutId: workoutId,
          name: cardioExercise.name,
          activity_time: cardioExercise.activity_time,
          notes: cardioExercise.notes,
        });
      }

      return {
        workout_id: workoutId,
        userId: workout.userId,
        date: workout.date,
        cardio: workout.cardio,
        name: workout.name,
        exercises: workout.exercises,
        muscle_groups: workout.muscle_groups,
        cardio_exercises: cardioExercises,
      };
    } catch (error) {
      console.error("Database error during workout insertion: ", error);
      throw error;
    }
  }

  async findWorkoutById(id: number): Promise<DataTypes.WorkoutDb | null> {
    console.log(`datasource | findWorkoutById(${id})`);
    const connection = await Builder.db();
    const [rows] = await connection.query(
      "SELECT * FROM workouts WHERE id = ?",
      [id]
    );

    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  }

  // Exercise methods
  // Exercise methods
  async insertExercise(
    exercise: Entities.Exercise
  ): Promise<DataTypes.QueryResult> {
    console.log(`Inserting exercise: ${JSON.stringify(exercise)}`);
    const connection = await Builder.db();

    // Insert the exercise details without the reps, weights, and rest_times
    const [result] = await connection.query(
      "INSERT INTO exercises (workout_id, name, sets) VALUES (?, ?, ?)",
      [exercise.workoutId, exercise.name, exercise.sets]
    );

    const exerciseId = result.insertId;
    console.log("exerciseId: ", result.insertId);

    // Insert reps, weights, and rest times for each set
    for (let i = 0; i < exercise.reps.length; i++) {
      // Insert into reps table
      await connection.query(
        "INSERT INTO reps (exercise_id, set_number, reps) VALUES (?, ?, ?)",
        [exerciseId, i + 1, exercise.reps[i]]
      );

      // Insert into weights table
      await connection.query(
        "INSERT INTO weights (exercise_id, set_number, weight) VALUES (?, ?, ?)",
        [exerciseId, i + 1, exercise.weight[i]]
      );

      // Insert into rest_times table
      await connection.query(
        "INSERT INTO rest_times (exercise_id, set_number, rest_time) VALUES (?, ?, ?)",
        [exerciseId, i + 1, exercise.rest_time[i]]
      );
    }

    return result as DataTypes.QueryResult;
  }

  async findExerciseById(id: number): Promise<DataTypes.ExerciseDb | null> {
    console.log(`datasource | getExerciseById(${id})`);
    const connection = await Builder.db();
    const [rows] = await connection.query(
      "SELECT * FROM exercises WHERE id = ?",
      [id]
    );

    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  }

  // MuscleGroup methods
  async insertMuscleGroup(
    muscleGroup: Entities.MuscleGroup
  ): Promise<DataTypes.QueryResult> {
    console.log(
      `datasource | createMuscleGroup(workoutId:${muscleGroup.workoutId}, name:${muscleGroup.name})`
    );

    // Rechercher l'ID du groupe musculaire dans muscle_group_types
    const connection = await Builder.db();
    const [rows] = await connection.query(
      "SELECT muscle_group_type_id FROM muscle_group_types WHERE name = ?",
      [muscleGroup.name]
    );

    if (rows.length === 0) {
      throw new Error(`Muscle group type '${muscleGroup.name}' not found.`);
    }

    const muscleGroupTypeId = rows[0].muscle_group_type_id;

    // Insérer dans muscle_groups avec muscle_group_type_id
    const [result] = await connection.query(
      "INSERT INTO muscle_groups (workout_id, muscle_group_type_id) VALUES (?, ?)",
      [muscleGroup.workoutId, muscleGroupTypeId]
    );

    return result as DataTypes.QueryResult; // Return the query result containing insertId
  }

  async findMuscleGroupById(
    id: number
  ): Promise<DataTypes.MuscleGroupDb | null> {
    console.log(`datasource | getMuscleGroupById(${id})`);
    const connection = await Builder.db();
    const [rows] = await connection.query(
      "SELECT * FROM muscle_groups WHERE id = ?",
      [id]
    );

    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  }

  async insertCardioExercise(
    cardioExercise: DataTypes.CardioExerciseDb
  ): Promise<DataTypes.QueryResult> {
    console.log(`datasource | createCardioExercise(${cardioExercise})`);
    const connection = await Builder.db();
    const [result] = await connection.query(
      "INSERT INTO cardio_exercises (workout_id, name, activity_time, notes) VALUES (?, ?, ?, ?)",
      [
        cardioExercise.workoutId,
        cardioExercise.name,
        cardioExercise.activity_time,
        cardioExercise.notes,
      ]
    );

    return result as DataTypes.QueryResult;
  }

  async getAllMuscleGroupTypes(): Promise<DataTypes.MuscleGroupTypeDb[]> {
    const connection = await Builder.db();
    const [rows] = await connection.query("SELECT * FROM muscle_group_types");
    return rows as DataTypes.MuscleGroupTypeDb[];
  }

  async findWorkoutsByMonth(
    year: number,
    month: number
  ): Promise<DataTypes.WorkoutDb[]> {
    console.log(`datasource | findWorkoutsByMonth(${year}, ${month})`);
    const connection = await Builder.db();
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDate = new Date(year, month, 0).toISOString().split("T")[0];

    // Fetch workouts for the specified month
    const [workouts] = await connection.query(
      `SELECT * FROM workouts WHERE date BETWEEN ? AND ?`,
      [startDate, endDate]
    );

    console.log(`Get workout: ${JSON.stringify(workouts)}`);

    // Fetch associated exercises, muscle groups, and cardio exercises for each workout
    const enrichedWorkouts = await Promise.all(
      workouts.map(async (workout: any) => {
        // Fetch exercises for the workout
        const [exercises] = await connection.query(
          `SELECT e.exercise_id, e.name, e.sets,
                        GROUP_CONCAT(DISTINCT r.reps ORDER BY r.set_number ASC) AS reps,
                        GROUP_CONCAT(DISTINCT w.weight ORDER BY w.set_number ASC) AS weights,
                        GROUP_CONCAT(DISTINCT rt.rest_time ORDER BY rt.set_number ASC) AS rest_times
                 FROM exercises e
                 LEFT JOIN reps r ON e.exercise_id = r.exercise_id
                 LEFT JOIN weights w ON e.exercise_id = w.exercise_id
                 LEFT JOIN rest_times rt ON e.exercise_id = rt.exercise_id
                 WHERE e.workout_id = ?
                 GROUP BY e.exercise_id`,
          [workout.workout_id]
        );

        console.log(`Get exercises: ${JSON.stringify(exercises)}`);

        // Parse the exercises
        const parsedExercises = exercises.map((exercise: any) => {
          const repsArray = exercise.reps
            ? exercise.reps.split(",").map(Number)
            : [];
          const weightsArray = exercise.weights
            ? exercise.weights.split(",").map(Number)
            : [];
          const restTimesArray = exercise.rest_times
            ? exercise.rest_times.split(",").map(Number)
            : [];

          // If reps, weights, or rest_times have fewer values than sets, repeat the last value
          const fillArray = (array: number[], length: number) => {
            if (array.length === 1) {
              return new Array(length).fill(array[0]);
            } else if (array.length < length) {
              return [
                ...array,
                ...new Array(length - array.length).fill(
                  array[array.length - 1]
                ),
              ];
            }
            return array;
          };

          const sets = exercise.sets;
          const reps = fillArray(repsArray, sets);
          const weight = fillArray(weightsArray, sets);
          const rest_time = fillArray(restTimesArray, sets);

          return {
            name: exercise.name,
            workoutId: workout.workout_id,
            sets,
            reps,
            weight,
            rest_time,
          };
        });

        // Fetch muscle groups for the workout
        const [muscleGroups] = await connection.query(
          `SELECT mg.*, mgt.name AS muscle_group_name 
                 FROM muscle_groups mg
                 JOIN muscle_group_types mgt ON mg.muscle_group_type_id = mgt.muscle_group_type_id
                 WHERE mg.workout_id = ?`,
          [workout.workout_id]
        );

        console.log(`Get muscle groups: ${JSON.stringify(muscleGroups)}`);

        // Fetch cardio exercises for the workout
        const [cardioExercises] = await connection.query(
          `SELECT * FROM cardio_exercises WHERE workout_id = ?`,
          [workout.workout_id]
        );

        console.log(`Get cardio: ${JSON.stringify(cardioExercises)}`);

        return {
          ...workout,
          exercises: parsedExercises || [], // Use parsedExercises here
          muscle_groups:
            muscleGroups.map((mg: any) => ({
              id: mg.muscle_group_id,
              name: mg.muscle_group_name,
            })) || [],
          cardio_exercises: cardioExercises || [],
        };
      })
    );

    console.log(`Enriched Workouts: ${JSON.stringify(enrichedWorkouts)}`);

    return enrichedWorkouts;
  }

  async findWorkoutByName(name: string): Promise<DataTypes.WorkoutDb | null> {
    console.log(`datasource | findWorkoutByName(${name})`);
    const connection = await Builder.db();
    const [rows] = await connection.query(
      "SELECT * FROM workouts WHERE name = ? LIMIT 1",
      [name]
    );

    if (rows.length > 0) {
      // Ensure exercises, muscle_groups, and cardio_exercises are populated here
      const workoutDb = rows[0];
      workoutDb.exercises = await this.findExercisesByWorkoutId(
        workoutDb.workout_id
      );
      workoutDb.muscle_groups = await this.findMuscleGroupsByWorkoutId(
        workoutDb.workout_id
      );
      workoutDb.cardio_exercises = await this.findCardioExercisesByWorkoutId(
        workoutDb.workout_id
      );

      return workoutDb;
    }
    return null;
  }

  async findExercisesByWorkoutId(
    workoutId: number
  ): Promise<DataTypes.ExerciseDb[]> {
    console.log(`datasource | findExercisesByWorkoutId(${workoutId})`);
    const connection = await Builder.db();

    const [exercises] = await connection.query(
      `SELECT e.exercise_id, e.name, e.sets,
              GROUP_CONCAT(DISTINCT r.reps ORDER BY r.set_number ASC SEPARATOR ',') AS reps,
              GROUP_CONCAT(DISTINCT w.weight ORDER BY w.set_number ASC SEPARATOR ',') AS weights,
              GROUP_CONCAT(DISTINCT rt.rest_time ORDER BY rt.set_number ASC SEPARATOR ',') AS rest_times
       FROM exercises e
       LEFT JOIN reps r ON e.exercise_id = r.exercise_id
       LEFT JOIN weights w ON e.exercise_id = w.exercise_id
       LEFT JOIN rest_times rt ON e.exercise_id = rt.exercise_id
       WHERE e.workout_id = ?
       GROUP BY e.exercise_id`,
      [workoutId]
    );

    return exercises.map((exercise: any) => {
      const repsArray = exercise.reps
        ? exercise.reps.split(",").map(Number)
        : [];
      const weightsArray = exercise.weights
        ? exercise.weights.split(",").map(Number)
        : [];
      const restTimesArray = exercise.rest_times
        ? exercise.rest_times.split(",").map(Number)
        : [];

      // Ensure all arrays have the same length as sets
      const fillArray = (array: number[], length: number) => {
        if (array.length < length) {
          return [
            ...array,
            ...new Array(length - array.length).fill(array[array.length - 1]),
          ];
        }
        return array;
      };

      const sets = exercise.sets;
      const reps = fillArray(repsArray, sets);
      const weight = fillArray(weightsArray, sets);
      const rest_time = fillArray(restTimesArray, sets);

      return {
        exercise_id: exercise.exercise_id,
        name: exercise.name,
        sets: sets,
        reps: reps,
        weight: weight,
        rest_time: rest_time,
      };
    });
  }

  async findMuscleGroupsByWorkoutId(
    workoutId: number
  ): Promise<DataTypes.MuscleGroupDb[]> {
    console.log(`datasource | findMuscleGroupsByWorkoutId(${workoutId})`);
    const connection = await Builder.db();

    const [muscleGroups] = await connection.query(
      `SELECT mg.muscle_group_id, mgt.name AS muscle_group_name
       FROM muscle_groups mg
       JOIN muscle_group_types mgt ON mg.muscle_group_type_id = mgt.muscle_group_type_id
       WHERE mg.workout_id = ?`,
      [workoutId]
    );

    return muscleGroups.map((mg: any) => ({
      muscle_group_id: mg.muscle_group_id,
      name: mg.muscle_group_name,
    }));
  }

  async findCardioExercisesByWorkoutId(
    workoutId: number
  ): Promise<DataTypes.CardioExerciseDb[]> {
    console.log(`datasource | findCardioExercisesByWorkoutId(${workoutId})`);
    const connection = await Builder.db();

    const [cardioExercises] = await connection.query(
      `SELECT ce.id, ce.name, ce.activity_time, ce.notes
       FROM cardio_exercises ce
       WHERE ce.workout_id = ?`,
      [workoutId]
    );

    return cardioExercises.map((ce: any) => ({
      cardio_exercise_id: ce.cardio_exercise_id,
      name: ce.name,
      activity_time: ce.activity_time,
      notes: ce.notes,
    }));
  }

  async findWorkoutsByUserId(userId: number): Promise<DataTypes.WorkoutDb[]> {
    console.log(`datasource | findWorkoutsByUserId(${userId})`);
    const connection = await Builder.db();
    const [workouts] = await connection.query(
      "SELECT * FROM workouts WHERE user_id = ?",
      [userId]
    );

    console.log("workout", workouts);

    const enrichedWorkouts = await Promise.all(
      workouts.map(async (workout: any) => {
        // Fetch exercises for the workout
        const exercises = await this.findExercisesByWorkoutId(
          workout.workout_id
        );

        // Fetch muscle groups for the workout
        const muscleGroups = await this.findMuscleGroupsByWorkoutId(
          workout.workout_id
        );

        // Fetch cardio exercises for the workout
        const cardioExercises = await this.findCardioExercisesByWorkoutId(
          workout.workout_id
        );

        console.log("exercices", exercises);
        console.log("musclegroups", muscleGroups);
        console.log("cardioExercises", cardioExercises);

        return {
          ...workout,
          exercises: exercises || [],
          muscle_groups: muscleGroups || [],
          cardio_exercises: cardioExercises || [],
        };
      })
    );

    return enrichedWorkouts;
  }
}

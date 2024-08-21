import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { api } from "../../core/api";
import { MuscleGroupType } from "@/types/auth";
import { Workout } from "@/types/workout";
import {
  Form,
  Input,
  Select,
  Button,
  Title,
  ExerciseContainer,
  RepsContainer,
  Label,
} from "./styles";

const WorkoutForm: React.FC = () => {
  const { user } = useContext(AuthContext);

  const [date, setDate] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [muscleGroup1, setMuscleGroup1] = useState<string | null>(null);
  const [muscleGroup2, setMuscleGroup2] = useState<string | null>(null);
  const [muscleGroup3, setMuscleGroup3] = useState<string | null>(null);
  const [cardio, setCardio] = useState(false);
  const [includeExercises, setIncludeExercises] = useState(false); // Nouvelle case à cocher pour les exercices
  const [exercises, setExercises] = useState([
    { name: "", sets: 1, reps: [0], weight: [0], rest_time: [0] },
  ]);
  const [cardioName, setCardioName] = useState("");
  const [activityTime, setActivityTime] = useState(0);
  const [availableMuscleGroups, setAvailableMuscleGroups] = useState<
    MuscleGroupType[]
  >([]);
  const [showLoadButton, setShowLoadButton] = useState(false);
  const [previousWorkout, setPreviousWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const fetchMuscleGroups = async () => {
      try {
        const response = await api.get("/workouts/muscle-group-types");
        setAvailableMuscleGroups(response.data);
      } catch (error) {
        console.error("Error getting muscle group types:", error);
      }
    };

    fetchMuscleGroups();
  }, []);

  useEffect(() => {
    if (workoutName) {
      const fetchPreviousWorkout = async () => {
        try {
          const response = await api.get(`/workouts/name?name=${workoutName}`);
          if (response.data) {
            setPreviousWorkout(response.data);
            setShowLoadButton(true);
          } else {
            setShowLoadButton(false);
          }
        } catch (error) {
          console.error("Failed to fetch previous workout:", error);
        }
      };

      fetchPreviousWorkout();
    } else {
      setShowLoadButton(false);
    }
  }, [workoutName]);

  const loadPreviousWorkout = () => {
    if (previousWorkout) {
      setExercises(previousWorkout.exercises);
      setCardio(previousWorkout.cardio);
      setIncludeExercises(previousWorkout.exercises.length > 0);
      setCardioName(previousWorkout.cardio_exercises?.[0]?.name || "");
      setActivityTime(
        previousWorkout.cardio_exercises?.[0]?.activity_time || 0
      );
      setMuscleGroup1(previousWorkout.muscle_groups?.[0]?.name || null);
      setMuscleGroup2(previousWorkout.muscle_groups?.[1]?.name || null);
      setMuscleGroup3(previousWorkout.muscle_groups?.[2]?.name || null);
      setShowLoadButton(false); // Hide the load button after loading the workout
    }
  };

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { name: "", sets: 1, reps: [0], weight: [0], rest_time: [0] },
    ]);
  };

  const handleExerciseChange = (index: number, field: string, value: any) => {
    const updatedExercises = [...exercises];

    if (field === "sets") {
      const newSets = Number(value);
      const newReps = Array(newSets).fill(0);
      const newWeights = Array(newSets).fill(0);
      const newRestTimes = Array(newSets).fill(0);

      updatedExercises[index] = {
        ...updatedExercises[index],
        sets: newSets,
        reps: newReps,
        weight: newWeights,
        rest_time: newRestTimes,
      };
    } else if (field.startsWith("reps")) {
      const repIndex = Number(field.split("-")[1]);
      const newReps = [...updatedExercises[index].reps];
      newReps[repIndex] = Number(value);
      updatedExercises[index] = {
        ...updatedExercises[index],
        reps: newReps,
      };
    } else if (field.startsWith("weight")) {
      const weightIndex = Number(field.split("-")[1]);
      const newWeights = [...updatedExercises[index].weight];
      newWeights[weightIndex] = Number(value);
      updatedExercises[index] = {
        ...updatedExercises[index],
        weight: newWeights,
      };
    } else if (field.startsWith("rest_time")) {
      const restTimeIndex = Number(field.split("-")[1]);
      const newRestTimes = [...updatedExercises[index].rest_time];
      newRestTimes[restTimeIndex] = Number(value);
      updatedExercises[index] = {
        ...updatedExercises[index],
        rest_time: newRestTimes,
      };
    } else {
      updatedExercises[index] = {
        ...updatedExercises[index],
        [field]: value,
      };
    }

    setExercises(updatedExercises);
  };

  const handleRemoveExercise = (index: number) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const handleAddWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const muscleGroups = [muscleGroup1, muscleGroup2, muscleGroup3]
        .filter((group) => group !== null)
        .map((group) => ({ name: group! }));

      const workoutData = {
        userId: user?.user.user_id,
        date,
        muscle_groups: muscleGroups,
        cardio,
        exercises: includeExercises ? exercises : [],
        cardio_exercises: cardio
          ? [
              {
                name: cardioName,
                activity_time: activityTime,
              },
            ]
          : [],
        notes: workoutName, // Use workoutName instead of notes
      };

      console.log("Workout:", workoutData);

      await api.post("/workouts", workoutData);

      // Reset form fields
      setDate("");
      setWorkoutName("");
      setMuscleGroup1(null);
      setMuscleGroup2(null);
      setMuscleGroup3(null);
      setCardio(false);
      setIncludeExercises(false);
      setExercises([
        { name: "", sets: 1, reps: [0], weight: [0], rest_time: [0] },
      ]);
      setCardioName("");
      setActivityTime(0);
    } catch (error) {
      console.error("Failed to add workout:", error);
    }
  };

  return (
    <Form onSubmit={handleAddWorkout}>
      <Title>Add a Workout</Title>
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <Input
        type="text"
        placeholder="Workout Name"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        required
      />

      {showLoadButton && (
        <Button type="button" onClick={loadPreviousWorkout}>
          Load Previous Workout
        </Button>
      )}

      <Select
        value={muscleGroup1 !== null ? muscleGroup1 : ""}
        onChange={(e) => setMuscleGroup1(e.target.value || null)}
      >
        <option value="" disabled>
          Select Muscle Group 1
        </option>
        {availableMuscleGroups.map((group) => (
          <option key={`muscle-group-${group.name}`} value={group.name}>
            {group.name}
          </option>
        ))}
      </Select>

      <Select
        value={muscleGroup2 !== null ? muscleGroup2 : ""}
        onChange={(e) => setMuscleGroup2(e.target.value || null)}
      >
        <option value="" disabled>
          Select Muscle Group 2
        </option>
        {availableMuscleGroups.map((group) => (
          <option key={`muscle-group-${group.name}`} value={group.name}>
            {group.name}
          </option>
        ))}
      </Select>

      <Select
        value={muscleGroup3 !== null ? muscleGroup3 : ""}
        onChange={(e) => setMuscleGroup3(e.target.value || null)}
      >
        <option value="" disabled>
          Select Muscle Group 3
        </option>
        {availableMuscleGroups.map((group) => (
          <option key={`muscle-group-${group.name}`} value={group.name}>
            {group.name}
          </option>
        ))}
      </Select>

      <label>
        Cardio:
        <input
          type="checkbox"
          checked={cardio}
          onChange={(e) => setCardio(e.target.checked)}
        />
      </label>

      <label>
        Exercises:
        <input
          type="checkbox"
          checked={includeExercises}
          onChange={(e) => setIncludeExercises(e.target.checked)}
        />
      </label>

      {includeExercises && (
        <>
          <h3>Exercises</h3>
          {exercises.map((exercise, index) => (
            <ExerciseContainer key={index}>
              <Label>Exercise Name</Label>
              <Input
                type="text"
                placeholder="Exercise Name"
                value={exercise.name}
                onChange={(e) =>
                  handleExerciseChange(index, "name", e.target.value)
                }
                required
              />

              <Label>Number of Sets</Label>
              <Input
                type="number"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) =>
                  handleExerciseChange(index, "sets", Number(e.target.value))
                }
                required
              />

              <Label>Reps for Each Set</Label>
              <RepsContainer>
                {Array.from({ length: exercise.sets }).map((_, repIndex) => (
                  <Input
                    key={`reps-${repIndex}`}
                    type="number"
                    placeholder={`Set ${repIndex + 1}`}
                    value={exercise.reps[repIndex]}
                    onChange={(e) =>
                      handleExerciseChange(
                        index,
                        `reps-${repIndex}`,
                        Number(e.target.value)
                      )
                    }
                    required
                  />
                ))}
              </RepsContainer>

              <Label>Weight for Each Set (kg)</Label>
              <RepsContainer>
                {Array.from({ length: exercise.sets }).map((_, weightIndex) => (
                  <Input
                    key={`weight-${weightIndex}`}
                    type="number"
                    placeholder={`Weight Set ${weightIndex + 1}`}
                    value={exercise.weight[weightIndex]}
                    onChange={(e) =>
                      handleExerciseChange(
                        index,
                        `weight-${weightIndex}`,
                        Number(e.target.value)
                      )
                    }
                    required
                  />
                ))}
              </RepsContainer>

              <Label>Rest Time for Each Set (seconds)</Label>
              <RepsContainer>
                {Array.from({ length: exercise.sets }).map(
                  (_, restTimeIndex) => (
                    <Input
                      key={`rest_time-${restTimeIndex}`}
                      type="number"
                      placeholder={`Rest Time Set ${restTimeIndex + 1}`}
                      value={exercise.rest_time[restTimeIndex]}
                      onChange={(e) =>
                        handleExerciseChange(
                          index,
                          `rest_time-${restTimeIndex}`,
                          Number(e.target.value)
                        )
                      }
                      required
                    />
                  )
                )}
              </RepsContainer>

              {exercises.length > 1 && (
                <Button
                  type="button"
                  onClick={() => handleRemoveExercise(index)}
                >
                  Remove Exercise
                </Button>
              )}
            </ExerciseContainer>
          ))}
          <Button type="button" onClick={handleAddExercise}>
            Add Another Exercise
          </Button>
        </>
      )}

      {cardio && (
        <>
          <h3>Cardio Exercise</h3>
          <Input
            type="text"
            placeholder="Cardio Name"
            value={cardioName}
            onChange={(e) => setCardioName(e.target.value)}
            required
          />

          <Input
            type="number"
            placeholder="Activity Time (minutes)"
            value={activityTime}
            onChange={(e) => setActivityTime(Number(e.target.value))}
            required
          />
        </>
      )}

      <Button type="submit">Add Workout</Button>
    </Form>
  );
};

export default WorkoutForm;

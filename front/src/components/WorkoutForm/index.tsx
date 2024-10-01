import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { api } from "../../core/api";
import { MuscleGroupType } from "@/types/auth";
import { Workout } from "@/types/workout";
import Modal from "../Modal";
import { FaDumbbell } from "react-icons/fa";
import {
  Form,
  Input,
  Select,
  Button,
  Title,
  ExerciseContainer,
  RepsContainer,
  Label,
  WorkoutList,
  WorkoutButton,
} from "./styles";

// Utility function to format the date as DD/MM/YYYY
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR");
};

const WorkoutForm: React.FC = () => {
  const { user } = useContext(AuthContext);

  const [date, setDate] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);
  const [cardio, setCardio] = useState(false);
  const [includeExercises, setIncludeExercises] = useState(false);
  const [exercises, setExercises] = useState([
    { name: "", sets: 1, reps: [0], weight: [0], rest_time: [0] },
  ]);
  const [cardioName, setCardioName] = useState("");
  const [activityTime, setActivityTime] = useState(0);
  const [availableMuscleGroups, setAvailableMuscleGroups] = useState<MuscleGroupType[]>([]);
  const [previousWorkouts, setPreviousWorkouts] = useState<Workout[]>([]);
  const [notes, setNotes] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMuscleGroups = async () => {
      try {
        const response = await api.get("/workouts/muscle-group-types");
        setAvailableMuscleGroups(response.data);
      } catch (error) {
        console.error("Error getting muscle group types:", error);
      }
    };

    const fetchPreviousWorkouts = async () => {
      try {
        const response = await api.get(`/workouts/last?userId=${user?.user.user_id}`);
        setPreviousWorkouts(response.data);
      } catch (error) {
        console.error("Failed to fetch previous workouts:", error);
      }
    };

    fetchMuscleGroups();
    fetchPreviousWorkouts();
  }, [user?.user.user_id]);

  const loadPreviousWorkout = (selectedWorkout: Workout) => {
    setExercises(selectedWorkout.exercises);
    setCardio(Boolean(selectedWorkout.cardio));
    setIncludeExercises(selectedWorkout.exercises.length > 0);
    setCardioName(selectedWorkout.cardio_exercises?.[0]?.name || "");
    setActivityTime(selectedWorkout.cardio_exercises?.[0]?.activity_time || 0);
    setMuscleGroups(selectedWorkout.muscle_groups.map(group => group.name));
    setIsModalOpen(false);
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
      if (Number(value) < 0) {
        alert("Reps cannot be negative");
        return;
      }
      newReps[repIndex] = Number(value);
      updatedExercises[index] = {
        ...updatedExercises[index],
        reps: newReps,
      };
    } else if (field.startsWith("weight")) {
      const weightIndex = Number(field.split("-")[1]);
      const newWeights = [...updatedExercises[index].weight];
      if (Number(value) < 0) {
        alert("Weight cannot be negative");
        return;
      }
      newWeights[weightIndex] = Number(value);
      updatedExercises[index] = {
        ...updatedExercises[index],
        weight: newWeights,
      };
    } else if (field.startsWith("rest_time")) {
      const restTimeIndex = Number(field.split("-")[1]);
      const newRestTimes = [...updatedExercises[index].rest_time];
      newRestTimes[restTimeIndex] = Number(value);
      if (Number(value) < 0) {
        alert("Rest Time cannot be negative");
        return;
      }
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
      const workoutData = {
        userId: user?.user.user_id,
        date,
        muscle_groups: muscleGroups.map(name => ({ name })),
        cardio,
        exercises: includeExercises ? exercises : [],
        cardio_exercises: cardio
          ? [
              {
                name: cardioName,
                activity_time: activityTime,
                notes: notes,
              },
            ]
          : [],
        name: workoutName,
      };

      const response = await api.post("/workouts", workoutData);

      const newWorkout = { ...workoutData, id: response.data.id };
      setPreviousWorkouts([...previousWorkouts, newWorkout]);

      setDate("");
      setWorkoutName("");
      setMuscleGroups([]);
      setCardio(false);
      setIncludeExercises(false);
      setExercises([{ name: "", sets: 1, reps: [0], weight: [0], rest_time: [0] }]);
      setCardioName("");
      setActivityTime(0);
      setNotes("");

      alert("Entrainement ajouté");
    } catch (error) {
      console.error("Failed to add workout:", error);
    }
  };

  return (
    <Form onSubmit={handleAddWorkout}>
      <Title>Add a Workout</Title>
      <Button type="button" onClick={() => setIsModalOpen(true)}>Load Previous Workout</Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Select a Previous Workout</h3>
        <WorkoutList>
          {previousWorkouts.map((workout) => (
            <li key={workout.id}>
              <WorkoutButton type="button" onClick={() => loadPreviousWorkout(workout)}>
                {workout.name} - {formatDate(workout.date)}
              </WorkoutButton>
            </li>
          ))}
        </WorkoutList>
      </Modal>

      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <Input type="text" placeholder="Workout Name" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} required />

      <Select multiple value={muscleGroups} onChange={(e) => setMuscleGroups(Array.from(e.target.selectedOptions, option => option.value))}>
        {availableMuscleGroups.map((group) => (
          <option key={group.name} value={group.name}>
            <FaDumbbell /> {group.name}
          </option>
        ))}
      </Select>

      <div>
        <button
          type="button"
          onClick={() => setCardio(!cardio)}
          style={{
            backgroundColor: cardio ? "green" : "grey",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {cardio ? "Cardio: ON" : "Cardio: OFF"}
        </button>

        <button
          type="button"
          onClick={() => setIncludeExercises(!includeExercises)}
          style={{
            backgroundColor: includeExercises ? "green" : "grey",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {includeExercises ? "Exercises: ON" : "Exercises: OFF"}
        </button>
      </div>

      {includeExercises && (
        <>
          <h3>Exercises</h3>
          {exercises.map((exercise, index) => (
            <ExerciseContainer key={index}>
              <Label>Exercise Name</Label>
              <Input
                type="text"
                list="exercise-names"
                placeholder="Exercise Name"
                value={exercise.name}
                onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                required
              />
              <datalist id="exercise-names">
                <option value="Bench Press" />
                <option value="Squat" />
                <option value="Deadlift" />
              </datalist>

              <Label>Number of Sets</Label>
              <Input
                type="number"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) => handleExerciseChange(index, "sets", Number(e.target.value))}
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
                    onChange={(e) => handleExerciseChange(index, `reps-${repIndex}`, Number(e.target.value))}
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
                    onChange={(e) => handleExerciseChange(index, `weight-${weightIndex}`, Number(e.target.value))}
                    required
                  />
                ))}
              </RepsContainer>

              <Label>Rest Time for Each Set (seconds)</Label>
              <RepsContainer>
                {Array.from({ length: exercise.sets }).map((_, restTimeIndex) => (
                  <Input
                    key={`rest_time-${restTimeIndex}`}
                    type="number"
                    placeholder={`Rest Time Set ${restTimeIndex + 1}`}
                    value={exercise.rest_time[restTimeIndex]}
                    onChange={(e) => handleExerciseChange(index, `rest_time-${restTimeIndex}`, Number(e.target.value))}
                    required
                  />
                ))}
              </RepsContainer>

              {exercises.length > 1 && (
                <Button type="button" onClick={() => handleRemoveExercise(index)}>Remove Exercise</Button>
              )}
            </ExerciseContainer>
          ))}
          <Button type="button" onClick={handleAddExercise}>Add Another Exercise</Button>
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

          <Input
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </>
      )}

      <Button type="submit">Add Workout</Button>
    </Form>
  );
};

export default WorkoutForm;

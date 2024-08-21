import React, { useEffect, useState } from "react";
import { getExercises } from "../../core/api";
import { Exercise } from "../../types/exercise";
import { List, ListItem, Title } from "./styles";

const ExerciseList: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const data = await getExercises();
      setExercises(data);
    };

    fetchExercises();
  }, []);

  return (
    <div>
      <Title>Exercises</Title>
      <List>
        {exercises.map((exercise) => (
          <ListItem key={exercise.id}>
            {exercise.name} - {exercise.sets} sets of {exercise.reps} reps
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ExerciseList;

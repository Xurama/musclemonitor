import React, { useState } from "react";
import { createExercise } from "../../core/api";
import { Form, Input, Button, Title } from "./styles";

const ExerciseForm: React.FC = () => {
  const [name, setName] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [restTime, setRestTime] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createExercise({ name, sets, reps, weight, restTime });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Add Exercise</Title>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Sets"
        value={sets}
        onChange={(e) => setSets(parseInt(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(parseInt(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(parseInt(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Rest Time"
        value={restTime}
        onChange={(e) => setRestTime(parseInt(e.target.value))}
      />
      <Button type="submit">Add Exercise</Button>
    </Form>
  );
};

export default ExerciseForm;

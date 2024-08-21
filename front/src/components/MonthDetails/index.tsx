import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import InfoCard from "../InfoCard";
import ChartCard from "../ChartCard";
import CardsContainer from "../CardsContainer";
import { InfoCardContainer, ChartCardContainer } from "./styles";
import { fetchMonthlyWorkoutData } from "../../core/api";

interface WorkoutData {
  workout_id: number;
  date: string;
  cardio: boolean;
  exercises: {
    name: string;
    sets: number;
    reps: number[];
    weight: number[];
  }[];
}

interface MonthDetailsProps {
  year: number;
  month: number;
}

const MonthDetails: React.FC<MonthDetailsProps> = ({ year, month }) => {
  const [workoutData, setWorkoutData] = useState<WorkoutData[]>([]);
  const [chartData, setChartData] = useState<
    { date: string; volume: number }[]
  >([]);
  const [totalWorkouts, setTotalWorkouts] = useState<number>(0);
  const [cardioWorkouts, setCardioWorkouts] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: WorkoutData[] = await fetchMonthlyWorkoutData(year, month);
        setWorkoutData(data);

        const totalWorkoutsCount = data.length;
        const cardioWorkoutsCount = data.filter(
          (workout) => workout.cardio
        ).length;

        setTotalWorkouts(totalWorkoutsCount);
        setCardioWorkouts(cardioWorkoutsCount);

        const processedData = data.map((workout: WorkoutData) => {
          const workoutDate = new Date(workout.date);
          return {
            date: workoutDate.getDate().toString(),
            volume: workout.exercises.reduce((total, exercise) => {
              const exerciseVolume = exercise.reps.reduce(
                (sum, reps, index) => {
                  const weight = exercise.weight[index] || 0;
                  return sum + reps * weight;
                },
                0
              );
              return total + exerciseVolume;
            }, 0),
          };
        });

        setChartData(processedData);
      } catch (error) {
        console.error("Failed to fetch workout data:", error);
      }
    };

    fetchData();
  }, [year, month]);

  return (
    <div>
      <h4>
        Details for {year}-{month + 1}
      </h4>
      <CardsContainer>
        <InfoCardContainer>
          <InfoCard title="Total Workouts" content={totalWorkouts} />
          <InfoCard title="Cardio Workouts" content={cardioWorkouts} />
        </InfoCardContainer>
        <ChartCardContainer>
          {chartData.length > 0 ? (
            <ChartCard>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="volume" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          ) : (
            <p>No workout data available for this month.</p>
          )}
        </ChartCardContainer>
      </CardsContainer>
    </div>
  );
};

export default MonthDetails;

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
import {
  InfoCardContainer,
  ChartCardContainer,
  ResponsiveWrapper,
  Title,
} from "./styles";
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
  cardio_exercises?: {
    name: string;
    activity_time: number;
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
  const [cardioChartData, setCardioChartData] = useState<
    { date: string; time: number }[]
  >([]);
  const [totalWorkouts, setTotalWorkouts] = useState<number>(0);
  const [totalVolume, setTotalVolume] = useState<number>(0);
  const [cardioWorkouts, setCardioWorkouts] = useState<number>(0);
  const [totalCardioTime, setTotalCardioTime] = useState<number>(0);

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

        // Process data for the volume chart
        const processedData = data
          .filter((workout) => workout.exercises.length > 0) // Exclude cardio-only workouts
          .map((workout: WorkoutData) => {
            const workoutDate = new Date(workout.date);
            const volume = workout.exercises.reduce((total, exercise) => {
              const exerciseVolume = exercise.reps.reduce(
                (sum, reps, index) => {
                  const weight = exercise.weight[index] || 0;
                  return sum + reps * weight;
                },
                0
              );
              return total + exerciseVolume;
            }, 0);
            return {
              date: workoutDate.getDate().toString(),
              volume,
            };
          });

        setChartData(processedData);

        // Calculate total volume for the month
        const totalVolumeCount = processedData.reduce(
          (sum, { volume }) => sum + volume,
          0
        );
        setTotalVolume(totalVolumeCount);

        // Process data for the cardio chart
        const processedCardioData = data
          .filter(
            (workout) =>
              workout.cardio_exercises && workout.cardio_exercises.length > 0
          )
          .map((workout: WorkoutData) => {
            const workoutDate = new Date(workout.date);
            const totalTime = workout.cardio_exercises!.reduce(
              (total, exercise) => total + exercise.activity_time,
              0
            );
            return {
              date: workoutDate.getDate().toString(),
              time: totalTime,
            };
          });

        setCardioChartData(processedCardioData);

        // Calculate total cardio time for the month
        const totalCardioTimeCount = processedCardioData.reduce(
          (sum, { time }) => sum + time,
          0
        );
        setTotalCardioTime(totalCardioTimeCount);
      } catch (error) {
        console.error("Failed to fetch workout data:", error);
      }
    };

    fetchData();
  }, [year, month]);

  return (
    <ResponsiveWrapper>
      <Title>
        Details for {year}-{month + 1}
      </Title>
      <CardsContainer>
        <InfoCardContainer>
          <InfoCard title="Total Workouts" content={totalWorkouts} />
          <InfoCard title="Total Volume (kg)" content={totalVolume} />
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
      <CardsContainer>
        <InfoCardContainer>
          <InfoCard title="Cardio Workouts" content={cardioWorkouts} />
          <InfoCard title="Total Cardio Time (min)" content={totalCardioTime} />
        </InfoCardContainer>
        <ChartCardContainer>
          {cardioChartData.length > 0 ? (
            <ChartCard>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cardioChartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="time" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          ) : (
            <p>No cardio data available for this month.</p>
          )}
        </ChartCardContainer>
      </CardsContainer>
    </ResponsiveWrapper>
  );
};

export default MonthDetails;

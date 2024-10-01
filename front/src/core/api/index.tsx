// src/core/api.ts
import axios from 'axios';
import { User } from '../../types/auth';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await api.post('/users/register', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createExercise = async (exercise: any) => {
  const { data } = await api.post("/exercises", exercise);
  return data;
};

export const getExercises = async () => {
  const { data } = await api.get("/exercises");
  return data;
};

export async function login(username: string, password: string): Promise<User> {
  console.log(`api | login(${username}, ${password})`);
  const response = await api.post(`/users/login`, { username, password });
  console.log(`response api | login() => ${response.data}`);
  return response.data;
}

// New function to fetch monthly workout data
export const fetchMonthlyWorkoutData = async (year: number, month: number) => {
  try {
    // Assuming the backend API endpoint follows this structure
    const response = await api.get(`/workouts/month`, {
      params: {
        year: year,
        month: month + 1, // Months are usually 0-indexed in JavaScript, adjust if necessary
      },
    });
    return response.data; // Return the workout data for the specified month
  } catch (error) {
    console.error('Error fetching monthly workout data:', error);
    throw error;
  }
};

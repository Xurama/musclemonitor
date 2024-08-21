export type User = {
  token: string;
  user: {
    user_id: number;
    username: string;
    password: string;
  };
};

export type MuscleGroupType = {
  muscle_group_type_id: number;
  name: string;
};


export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

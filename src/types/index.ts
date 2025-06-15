export type UserProfile = {
  id: string;
  name: string;
  avatar_url?: string;
  role: 'user' | 'admin';
  daily_streak: number;
  last_session_date?: string;
  total_sessions: number;
  preferences: {
    notifications: boolean;
    accessibility: {
      highContrast: boolean;
      fontSize: 'small' | 'medium' | 'large';
    };
  };
  created_at: string;
  updated_at: string;
};

export type ExerciseSession = {
  id: string;
  user_id: string;
  exercise_type: string;
  duration: number;
  completed_at: string;
  notes?: string;
};

export type Reminder = {
  id: string;
  user_id: string;
  title: string;
  time: string;
  days: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
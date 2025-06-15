import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: { name?: string; avatar_url?: string }) => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateProfile = async (data: { name?: string; avatar_url?: string; role?: string; preferences?: any }) => {
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        ...data,
        updated_at: new Date().toISOString(),
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const updateStreak = async () => {
    try {
      const { error } = await supabase.rpc('update_streak', {
        user_id: user?.id
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const saveSession = async (exerciseData: any, duration: number) => {
    try {
      const { error } = await supabase.from('sessions').insert({
        user_id: user?.id,
        exercise_data: exerciseData,
        duration: duration
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const getReminders = async () => {
    try {
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user?.id);
      return { data, error };
    } catch (error) {
      return { error };
    }
  };

  const updateReminder = async (reminderData: any) => {
    try {
      const { error } = await supabase.from('reminders').upsert({
        ...reminderData,
        user_id: user?.id,
        updated_at: new Date().toISOString()
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const value = {
    session,
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any; role?: string }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);

    // Bootstrap existing session
    const initAuth = async () => {
      const { data: { session: existingSession } } = await supabase.auth.getSession();
      setSession(existingSession);
      const currentUser = existingSession?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentUser.id)
            .single();
          if (error) throw error;
          setUserRole(profile?.role || 'customer');
        } catch (error) {
          console.error('Error fetching initial user role:', error);
          setUserRole('customer');
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    };

    initAuth();

    // Listen for future auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentUser.id)
            .single();
          if (error) throw error;
          setUserRole(profile?.role || 'customer');
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole('customer');
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    let fetchedRole: string | undefined;

    if (data?.session) {
      setSession(data.session);
    }
    if (data?.user) {
      setUser(data.user);
    }

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
    } else if (data.user) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
        fetchedRole = profile?.role || 'customer';
        setUserRole(fetchedRole);
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        });
      } catch (error) {
        console.error('Error fetching user role on sign in:', error);
        fetchedRole = 'customer';
        setUserRole(fetchedRole);
      }
    }

    return { error, role: fetchedRole };
  };

  const signOut = async () => {
    localStorage.removeItem('spice-garden-cart');
    const { error } = await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setUserRole(null);
    if (error) console.error('Sign out error:', error);
  };

  const value = {
    user,
    session,
    userRole,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin: userRole === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

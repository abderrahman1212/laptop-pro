import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AdminState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

export const useAdmin = () => {
  const [state, setState] = useState<AdminState>({
    user: null,
    isAdmin: false,
    loading: true,
  });

  const checkAdmin = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    return !!data;
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const isAdmin = await checkAdmin(session.user.id);
          setState({ user: session.user, isAdmin, loading: false });
        } else {
          setState({ user: null, isAdmin: false, loading: false });
        }
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const isAdmin = await checkAdmin(session.user.id);
        setState({ user: session.user, isAdmin, loading: false });
      } else {
        setState({ user: null, isAdmin: false, loading: false });
      }
    });

    return () => subscription.unsubscribe();
  }, [checkAdmin]);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    
    const isAdmin = await checkAdmin(data.user.id);
    if (!isAdmin) {
      await supabase.auth.signOut();
      throw new Error('NOT_ADMIN');
    }
    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { ...state, signIn, signOut };
};

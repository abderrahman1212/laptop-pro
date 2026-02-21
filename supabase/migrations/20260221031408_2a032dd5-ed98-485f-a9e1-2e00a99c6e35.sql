
-- Create a helper function to bootstrap the first admin
-- This creates a user via Supabase auth and assigns admin role
CREATE OR REPLACE FUNCTION public.create_admin_if_not_exists()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid;
BEGIN
  -- Check if admin role already exists
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    -- Look for existing user
    SELECT id INTO _user_id FROM auth.users WHERE email = 'admin@bh-tech.ma';
    
    -- If user exists, assign admin role
    IF _user_id IS NOT NULL THEN
      INSERT INTO public.user_roles (user_id, role) VALUES (_user_id, 'admin')
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;
END;
$$;

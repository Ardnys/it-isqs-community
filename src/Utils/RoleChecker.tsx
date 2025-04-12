import { supabaseClient } from '../supabase/supabaseClient';

export const getUserRole = async (
  userEmail: string,
): Promise<'registered' | 'professional' | null> => {
  try {
    console.log('mail is ' + userEmail);
    // Check if they're a professional
    const { data: professional, error: proError } = await supabaseClient
      .from('Professional')
      .select('email')
      .eq('email', userEmail)
      .maybeSingle();

    if (proError) throw proError;
    if (professional) return 'professional';

    // Check if they're a registered user
    const { data: registered, error: regError } = await supabaseClient
      .from('RegisteredUser')
      .select('email')
      .eq('email', userEmail)
      .maybeSingle();

    if (regError) throw regError;
    if (registered) return 'registered';

    return null;
  } catch (error) {
    console.error('Error checking role:', error);
    return null;
  }
};

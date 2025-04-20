import { Session, User } from '@supabase/supabase-js';
import { atom } from 'nanostores';
import { supabaseClient } from '../supabase/supabaseClient';
import { notifications } from '@mantine/notifications';

export const $currUser = atom<ExtendedUser | null>(null);
export const $registeredUser = atom<RegisteredUser | null>(null); // New nanostore for RegisteredUser data

export interface ExtendedUser extends User {
  name: string;
  surname: string;
  user_metadata: {
    profile_picture?: string;
    // ... other metadata
  };
}

export interface RegisteredUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: string;
  auth_uid: string;
  pfp_url?: string;
}

const fetchRegisteredUserData = async (authUid: string) => {
  try {
    const { data, error } = await supabaseClient
      .from('RegisteredUser')
      .select('id, name, surname, email, role, auth_uid, pfp_url')
      .eq('auth_uid', authUid)
      .single();

    if (error) {
      console.error('Error while fetching RegisteredUser data:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch RegisteredUser data.',
        color: 'red',
      });
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error while querying RegisteredUser data:', err);
    return null;
  }
};

supabaseClient.auth.onAuthStateChange((authChangeEvent, session) => {
  if (session?.user) {
    // Fetch RegisteredUser data and store it in $registeredUser
    fetchRegisteredUserData(session.user.id).then((registeredUserData) => {
      if (registeredUserData) {
        $registeredUser.set({
          ...registeredUserData,
          surname: registeredUserData.surname || '',
          email: registeredUserData.email || '',
          role: registeredUserData.role || '',
          auth_uid: registeredUserData.auth_uid || '',
          pfp_url: registeredUserData.pfp_url || '',
        });
      } else {
        $registeredUser.set(null);
      }
    });

    // Store session user data in $currUser
    const userMetadata = session.user.user_metadata;
    const extendedUser: ExtendedUser = {
      ...session.user, // Include other user data
      name: userMetadata?.name || '', // Access name from user_metadata
      surname: userMetadata?.surname || '', // Access surname from user_metadata
    };
    $currUser.set(extendedUser);
  } else {
    $currUser.set(null); // No user logged in
    $registeredUser.set(null); // Clear RegisteredUser data
  }
});

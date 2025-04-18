import { User } from '@supabase/supabase-js';
import { atom } from 'nanostores';
import { supabaseClient } from '../supabase/supabaseClient';
import { notifications } from '@mantine/notifications';

export const $currUser = atom<ExtendedUser | null>(null);
export interface ExtendedUser extends User {
  name: string;
  surname: string;
  user_metadata: {
    profile_picture?: string;
    // ... other metadata
  };
}
supabaseClient.auth.onAuthStateChange((authChangeEvent, session) => {
  if (session?.user) {
    const userMetadata = session.user.user_metadata;
    const extendedUser: ExtendedUser = {
      ...session.user, // Include other user data
      name: userMetadata?.name || '', // Access name from user_metadata
      surname: userMetadata?.surname || '', // Access surname from user_metadata
    };

    // Store the extended user
    $currUser.set(extendedUser);
  } else {
    $currUser.set(null); // No user logged in
  }
});

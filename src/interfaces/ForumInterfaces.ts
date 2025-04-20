interface Author {
  name: string;
  surname: string | null;
  email: string | null;
  pfp_url?: string | null;
  profession?: string; // for professionals
}

interface ForumPost {
  id: number;
  title: string | null;
  creation_date: string;
  votes: number | null;
  user_id: number | null;
  RegisteredUser?: Author | null;
}

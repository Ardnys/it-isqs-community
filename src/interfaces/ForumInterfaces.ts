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
  upvotes: number;
  downvotes: number;
  user_id: number;
  RegisteredUser?: Author | null;
}

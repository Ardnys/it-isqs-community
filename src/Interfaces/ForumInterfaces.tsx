interface BaseAuthor {
  id: string;
  name: string;
  avatar_url: string | null;
  type: 'professional' | 'user';
}

interface ProfessionalAuthor extends BaseAuthor {
  type: 'professional';
  occupation?: string;
}

interface UserAuthor extends BaseAuthor {
  type: 'user';
}

type PostAuthor = ProfessionalAuthor | UserAuthor;

interface ForumPost {
  id: number;
  title: string;
  body: string;
  created_at: string;
  votes: number;
  author: PostAuthor;
}

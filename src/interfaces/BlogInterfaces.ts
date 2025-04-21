type Blog = {
  body: string | null;
  date: string | null;
  id: number;
  thumbnail: string | null;
  title: string | null;
  coAuthors?: { name: string; avatar: string | null }[]; // Updated to match BlogPost's prop type
};

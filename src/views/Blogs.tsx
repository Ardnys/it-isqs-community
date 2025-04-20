import { Button, Container, Skeleton, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../supabase/supabaseClient';
import BlogPost from '../components/BlogPost';
import { useStore } from '@nanostores/react';
import { $registeredUser } from '../global-state/user';

type Blog = {
  body: string | null;
  date: string | null;
  id: number;
  thumbnail: string | null;
  title: string | null;
  coAuthors?: { name: string; avatar: string | null }[]; // Updated to match BlogPost's prop type
};

const Blogs = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<Array<Blog> | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useStore($registeredUser);
  const fetchBlogPosts = async () => {
    setLoading(true);

    const { data, error } = await supabaseClient.from('Blog').select(`
      *,
      CoAuthors (
        RegisteredUser (
          name,
          pfp_url
        )
      )
    `);

    if (error) {
      console.error('Error while fetching blog posts', error);
      setLoading(false);
      return;
    }

    const postsWithThumbnailsAndCoAuthors = data.map((post) => {
      const publicUrl = post.thumbnail
        ? supabaseClient.storage
            .from('storage')
            .getPublicUrl(`thumbnails/${post.thumbnail}`).data.publicUrl
        : null;

      // Mapping coAuthors to include name and avatar (profile picture)
      const coAuthors =
        post.CoAuthors?.map((ca) => ({
          name: ca.RegisteredUser?.name,
          avatar: ca.RegisteredUser?.pfp_url
            ? ca.RegisteredUser.pfp_url.startsWith('http') // Check if it's already a full URL
              ? ca.RegisteredUser.pfp_url // Use directly if it's a full URL
              : supabaseClient.storage
                  .from('storage')
                  .getPublicUrl(`profile-pictures/${ca.RegisteredUser.pfp_url}`)
                  .data.publicUrl // Construct the full URL if not
            : null,
        })) ?? [];

      return {
        ...post,
        thumbnail: publicUrl,
        coAuthors, // Add coAuthors array with name and avatar
      };
    });

    console.log(postsWithThumbnailsAndCoAuthors);

    setBlogPosts(postsWithThumbnailsAndCoAuthors);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <Container size="lg" py="lg">
      <Stack justify="flex-start" gap="lg">
        {user?.role === 'professional' && (
          <Button onClick={() => navigate('/blog-edit')}>
            Create New Post
          </Button>
        )}

        {loading ? (
          <>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} height={120} radius="md" />
            ))}
          </>
        ) : (
          blogPosts?.map((post) => (
            <BlogPost
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              thumbnail={post.thumbnail}
              date={post.date}
              coAuthors={post.coAuthors} // Pass the correct coAuthors here
            />
          ))
        )}
      </Stack>
    </Container>
  );
};

export default Blogs;

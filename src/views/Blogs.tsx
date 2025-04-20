import { Button, Container, Skeleton, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../supabase/supabaseClient';
import BlogPost from '../components/BlogPost';

type Blog = {
  body: string | null;
  date: string | null;
  id: number;
  thumbnail: string | null;
  title: string | null;
};

const Blogs = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<Array<Blog> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogPosts = async () => {
    setLoading(true);
    const { data, error } = await supabaseClient.from('Blog').select();
    if (error) {
      console.error('error while fetching blog posts', error);
      setLoading(false);
      return;
    }
    const postsWithThumbnails = data.map((post) => {
      const publicUrl = post.thumbnail
        ? supabaseClient.storage
            .from('storage')
            .getPublicUrl(`thumbnails/${post.thumbnail}`).data.publicUrl
        : null;
      return {
        ...post,
        thumbnail: publicUrl,
      };
    });
    setBlogPosts(postsWithThumbnails);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <Container size="lg" py="lg">
      <Stack justify="flex-start" gap="lg">
        <Button onClick={() => navigate('/blog-edit')}>Create New Post</Button>

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
            />
          ))
        )}
      </Stack>
    </Container>
  );
};

export default Blogs;

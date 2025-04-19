import { Button, Stack, Title } from '@mantine/core';
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

  const fetchBlogPosts = async () => {
    const { data, error } = await supabaseClient.from('Blog').select();
    if (error) {
      console.error('error while fetching blog posts', error);
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
    console.log(postsWithThumbnails);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <Stack>
      <Button onClick={() => navigate('/blog-edit')}>Create New Post</Button>

      {blogPosts?.map((post) => (
        <BlogPost
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          thumbnail={post.thumbnail}
          date={post.date}
        />
      ))}
    </Stack>
  );
};

export default Blogs;

// views/BlogDetail.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabaseClient } from '../supabase/supabaseClient';
import { Box, Container, Image, Stack, Text, Title } from '@mantine/core';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabaseClient
        .from('Blog')
        .select()
        .eq('id', Number(id))
        .single();

      if (error) {
        console.error('Error fetching blog:', error);
      } else {
        const publicUrl = data.thumbnail
          ? supabaseClient.storage
              .from('storage')
              .getPublicUrl(`thumbnails/${data.thumbnail}`).data.publicUrl
          : null;
        setBlog({ ...data, thumbnail: publicUrl });
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <Text>Loading...</Text>;

  return (
    <>
      {blog.thumbnail && (
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          h={200}
          fit="cover"
          w="100%"
          style={{ objectPosition: 'center' }}
        />
      )}

      <Container size="md" px="md" py="lg">
        <Stack>
          <Title order={1} size="2.5rem" fw={700}>
            {blog.title}
          </Title>
          <Text size="sm" c="dimmed">
            {blog.date ? new Date(blog.date).toLocaleDateString() : ''}
          </Text>
          <Box
            mt="md"
            style={{ lineHeight: 1.6, fontSize: '1.1rem' }}
            dangerouslySetInnerHTML={{
              __html: blog.body || '<i>No content</i>',
            }}
          />
        </Stack>
      </Container>
    </>
  );
};

export default BlogDetail;

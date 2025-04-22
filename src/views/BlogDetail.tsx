import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabaseClient } from '../supabase/supabaseClient';
import {
  Box,
  Center,
  Container,
  Image,
  Loader,
  Stack,
  Text,
  Title,
  Transition,
} from '@mantine/core';

type Blog = {
  thumbnail: string | null;
  title: string | null;
  date: string | null;
  body: string | null;
};

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

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

      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="xs">
          <Loader color="teal" size="lg" variant="dots" />
          <Text size="sm" c="dimmed">
            Loading blog post...
          </Text>
        </Stack>
      </Center>
    );
  }

  if (!blog) {
    return (
      <Center h="100vh">
        <Text size="lg" c="red">
          Blog post not found.
        </Text>
      </Center>
    );
  }

  return (
    <>
      {blog.thumbnail && (
        <Image
          src={blog.thumbnail}
          alt={blog.title || 'Blog Image'}
          h={200}
          fit="cover"
          w="100%"
          style={{ objectPosition: 'center' }}
        />
      )}

      <Container size="md" px="md" py="lg">
        <Transition
          mounted={!loading}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <Stack style={styles}>
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
          )}
        </Transition>
      </Container>
    </>
  );
};

export default BlogDetail;

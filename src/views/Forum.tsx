import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Title,
  Button,
  Container,
  ActionIcon,
  Avatar,
  Flex,
} from '@mantine/core';
import { IconArrowUp, IconArrowDown, IconMessage } from '@tabler/icons-react';
import { supabaseClient } from '../supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabaseClient
        .from('ForumPost')
        .select(
          `
          id,
          title,
          creation_date,
          votes,
          user_id,
          RegisteredUser:user_id(name, surname, email)
        `,
        )
        .order('creation_date', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error.message);
      } else {
        setPosts(data);
      }
    }

    fetchPosts();
  }, []);

  return (
    <Container size="md" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={1}>Forum</Title>
        <Button color="teal" size="lg">
          Create Post
        </Button>
      </Group>

      <Stack gap="md">
        {posts?.map((post) => {
          // const { data: avatarUrl } = supabaseClient.storage
          //   .from('public')
          //   .getPublicUrl(post.avatarPath);

          return (
            <Card key={post.id} shadow="sm" p="lg" radius="md" withBorder>
              <Flex gap="md" align="flex-start">
                {/* <Avatar
                  src={avatarUrl.publicUrl}
                  alt={post.author}
                  radius="xl"
                  size="lg"
                /> */}

                <div style={{ flex: 1 }}>
                  <Group
                    justify="space-between"
                    mb="xs"
                    onClick={() => navigate('/forum/{deez}')}
                  >
                    <Title order={3}>{post.title ?? 'Untitled'}</Title>

                    <Badge
                      color={post.votes && post.votes >= 0 ? 'teal' : 'red'}
                    >
                      {post.votes ?? 0} votes
                    </Badge>
                  </Group>

                  <Text size="sm" c="dimmed">
                    Posted by{' '}
                    {post.RegisteredUser
                      ? `${post.RegisteredUser.name} ${post.RegisteredUser.surname ?? ''}`
                      : 'Anonymous'}
                    · {new Date(post.creation_date).toLocaleDateString()}
                  </Text>

                  <Group mt="md">
                    <ActionIcon variant="light">
                      <IconArrowUp size="1rem" />
                    </ActionIcon>
                    <ActionIcon variant="light">
                      <IconArrowDown size="1rem" />
                    </ActionIcon>
                    <Badge
                      leftSection={<IconMessage size="1rem" />}
                      variant="outline"
                    >
                      {0} comments
                    </Badge>
                  </Group>
                </div>
              </Flex>
            </Card>
          );
        })}
      </Stack>
    </Container>
  );
}

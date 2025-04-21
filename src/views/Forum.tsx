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
import handlePostVote, { fetchPostVotes } from '../Utils/PostVoteHandler';
import { useStore } from '@nanostores/react';
import { $registeredUser } from '../global-state/user';

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[] | null>(null);
  const navigate = useNavigate();
  const user = useStore($registeredUser);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data: posts, error } = await supabaseClient
        .from('ForumPost')
        .select(
          `
        id,
        title,
        creation_date,
        body,
        user_id,
        RegisteredUser:user_id(name, surname, email, pfp_url)
      `,
        )
        .order('creation_date', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error.message);
        return;
      }

      // Wait for all vote counts to be fetched in parallel
      const postsWithVotes = await Promise.all(
        posts.map(async (post) => {
          const votes = await fetchPostVotes(post.id);
          return { ...post, ...votes, user_id: post.user_id ?? 0 };
        }),
      );

      setPosts(postsWithVotes);
    };

    fetchPosts();
  }, []);

  return (
    <Container size="lg" py="lg">
      <Group justify="space-between" mb="xl">
        <Title order={1}>Forum</Title>
        <Button
          color="teal"
          size="lg"
          onClick={() => navigate('/forum/create')}
        >
          Create Post
        </Button>
      </Group>

      <Stack gap="md">
        {posts?.map((post) => {
          return (
            <Card key={post.id} shadow="sm" p="lg" radius="md" withBorder>
              <Flex gap="md" align="flex-start">
                <Avatar
                  src={post.RegisteredUser?.pfp_url}
                  alt={post.RegisteredUser?.name}
                  radius="xl"
                  size="lg"
                />

                <div style={{ flex: 1 }}>
                  <Group
                    justify="space-between"
                    mb="xs"
                    onClick={() => navigate(`/forum/${post.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Title order={3}>{post.title ?? 'Untitled'}</Title>
                  </Group>

                  <Text size="sm" c="dimmed">
                    Posted by{' '}
                    {post.RegisteredUser
                      ? `${post.RegisteredUser.name} ${post.RegisteredUser.surname ?? ''}`
                      : 'Anonymous'}
                    · {new Date(post.creation_date).toLocaleDateString()}
                  </Text>

                  <Group mt="md" align="center">
                    <ActionIcon
                      variant="light"
                      onClick={() =>
                        handlePostVote(
                          post.id,
                          true,
                          user?.id ?? 0,
                          posts,
                          (value) => setPosts(value as ForumPost[] | null),
                        )
                      }
                    >
                      <IconArrowUp size="1rem" />
                    </ActionIcon>
                    <Text size="sm">{post.upvotes}</Text>
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() =>
                        handlePostVote(
                          post.id,
                          false,
                          user?.id ?? 0,
                          posts,
                          (value) => setPosts(value as ForumPost[] | null),
                        )
                      }
                    >
                      <IconArrowDown size="1rem" />
                    </ActionIcon>
                    <Text size="sm">{post.downvotes}</Text>
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

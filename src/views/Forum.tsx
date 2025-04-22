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
  Pagination,
  Loader,
  Center,
} from '@mantine/core';
import {
  IconArrowUp,
  IconArrowDown,
  IconMessage,
  IconX,
} from '@tabler/icons-react';
import { supabaseClient } from '../supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handlePostVote, {
  fetchPostComments,
  fetchPostVotes,
} from '../Utils/PostVoteHandler';
import { useStore } from '@nanostores/react';
import { $registeredUser } from '../global-state/user';
import { notifications } from '@mantine/notifications';

const POSTS_PER_PAGE = 5;

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const user = useStore($registeredUser);
  const [loading, setLoading] = useState(true);

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
        notifications.show({
          title: 'Error while fetching posts',
          message: error.message,
          color: 'red',
          icon: <IconX size={16} />,
          autoClose: 4000,
          position: 'top-center',
        });
        return;
      }

      const postsWithVotes = await Promise.all(
        posts.map(async (post) => {
          const votes = await fetchPostVotes(post.id);
          const replies = await fetchPostComments(post.id);
          return {
            ...post,
            ...votes,
            user_id: post.user_id ?? 0,
            num_replies: replies,
          };
        }),
      );

      setPosts(postsWithVotes);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const paginatedPosts = posts?.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  if (loading) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="xs">
          <Loader color="teal" size="lg" variant="dots" />
          <Text size="sm" c="dimmed">
            Loading forum posts...
          </Text>
        </Stack>
      </Center>
    );
  }
  return (
    <Container size="lg" py="lg">
      <Group justify="space-between" mb="xl">
        <Title order={1}>Forum</Title>

        <Button
          color="teal"
          size="lg"
          onClick={() => {
            if (user) {
              navigate('/forum/create');
            } else {
              notifications.show({
                title: 'You must be logged in for that!',
                message: 'Login to join the discussion!',
                color: 'red',
                autoClose: 3000,
              });
            }
          }}
        >
          Create Post
        </Button>
      </Group>

      <Stack gap="md">
        {paginatedPosts?.map((post) => {
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
                      onClick={() => {
                        if (user) {
                          handlePostVote(
                            post.id,
                            true,
                            user?.id ?? 0,
                            posts,
                            (value) => setPosts(value as ForumPost[] | null),
                          );
                        } else {
                          notifications.show({
                            title: 'You must be logged in for that!',
                            message: 'Login to vote posts',
                            color: 'red',
                            autoClose: 3000,
                          });
                        }
                      }}
                    >
                      <IconArrowUp size="1rem" />
                    </ActionIcon>
                    <Text size="sm">{post.upvotes}</Text>
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => {
                        if (user) {
                          handlePostVote(
                            post.id,
                            false,
                            user?.id ?? 0,
                            posts,
                            (value) => setPosts(value as ForumPost[] | null),
                          );
                        } else {
                          notifications.show({
                            title: 'You must be logged in for that!',
                            message: 'Login to vote posts',
                            color: 'red',
                            autoClose: 3000,
                          });
                        }
                      }}
                    >
                      <IconArrowDown size="1rem" />
                    </ActionIcon>
                    <Text size="sm">{post.downvotes}</Text>
                    <Badge
                      leftSection={<IconMessage size="1rem" />}
                      variant="outline"
                    >
                      {post.num_replies} replies
                    </Badge>
                  </Group>
                </div>
              </Flex>
            </Card>
          );
        })}
      </Stack>

      {/* 🔥 Pagination control */}
      {posts && posts.length > POSTS_PER_PAGE && (
        <Group justify="center" mt="xl">
          <Pagination
            total={Math.ceil(posts.length / POSTS_PER_PAGE)}
            value={currentPage}
            onChange={setCurrentPage}
            size="md"
            radius="md"
          />
        </Group>
      )}
    </Container>
  );
}

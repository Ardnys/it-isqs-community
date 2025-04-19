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

// Mock posts data (now includes avatar paths)
const mockPosts = [
  {
    id: 1,
    title: 'How to use Mantine with Next.js?',
    author: 'dev_user',
    avatarPath: 'avatars/dev_user.png', // Path in Supabase Storage
    date: '2 hours ago',
    votes: 24,
    comments: 5,
  },
  {
    id: 2,
    title: 'Best practices for React state management in 2024',
    author: 'react_lover',
    avatarPath: 'avatars/react_lover.jpg',
    date: '1 day ago',
    votes: 56,
    comments: 12,
  },
  {
    id: 3,
    title: 'Introducing a new UI library - Should we switch?',
    author: 'ui_enthusiast',
    avatarPath: 'avatars/ui_enthusiast.webp',
    date: '3 days ago',
    votes: -3,
    comments: 8,
  },
];

export default function ForumPage() {
  return (
    <Container size="md" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={1}>Forum</Title>
        <Button color="teal" size="lg">
          Create Post
        </Button>
      </Group>

      <Stack gap="md">
        {mockPosts.map((post) => {
          // Get public avatar URL from Supabase Storage
          const { data: avatarUrl } = supabaseClient.storage
            .from('public') // Your bucket name
            .getPublicUrl(post.avatarPath);

          return (
            <Card key={post.id} shadow="sm" p="lg" radius="md" withBorder>
              <Flex gap="md" align="flex-start">
                {/* Avatar on the left */}
                <Avatar
                  src={avatarUrl.publicUrl}
                  alt={post.author}
                  radius="xl"
                  size="lg"
                />

                {/* Post content on the right */}
                <div style={{ flex: 1 }}>
                  <Group justify="space-between" mb="xs">
                    <Title order={3}>{post.title}</Title>
                    <Badge color={post.votes >= 0 ? 'teal' : 'red'}>
                      {post.votes} votes
                    </Badge>
                  </Group>

                  <Text size="sm" c="dimmed">
                    Posted by {post.author} · {post.date}
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
                      {post.comments} comments
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

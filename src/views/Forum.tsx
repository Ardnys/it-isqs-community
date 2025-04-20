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
import { useStore } from '@nanostores/react';
import { $registeredUser } from '../global-state/user';

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[] | null>(null);
  const navigate = useNavigate();
  const user = useStore($registeredUser);

  useEffect(() => {
    const fetchPostVotes = async (id: number) => {
      const { count: upvotes, error: uperror } = await supabaseClient
        .from('UserPostVotes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', id)
        .eq('upvote', true);

      if (uperror) {
        console.error('Failed to fetch vote count for post', id, uperror);
        return { upvotes: 0, downvotes: 0 };
      }

      const { count: downvotes, error: downerror } = await supabaseClient
        .from('UserPostVotes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', id)
        .eq('upvote', false);

      if (downerror) {
        console.error('Failed to fetch vote count for post', id, downerror);
        return { upvotes: 0, downvotes: 0 };
      }

      return { upvotes: upvotes || 0, downvotes: downvotes || 0 };
    };

    const fetchPosts = async () => {
      const { data: posts, error } = await supabaseClient
        .from('ForumPost')
        .select(
          `
        id,
        title,
        creation_date,
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

  const handleUpvote = async (postId: number, upvote: boolean) => {
    try {
      // Check if the user has already voted on this post
      const { data: existingVote, error: fetchError } = await supabaseClient
        .from('UserPostVotes')
        .select()
        .eq('post_id', postId)
        .eq('user_id', user?.id ?? 0)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // Ignore "No rows found" error (PGRST116), as it means the user hasn't voted yet
        console.error('Error fetching existing vote:', fetchError);
        return;
      }

      if (existingVote) {
        // If the user has already voted, update their vote
        if (existingVote.upvote === upvote) {
          // If the vote is the same as the current action, do nothing
          const { error } = await supabaseClient
            .from('UserPostVotes')
            .delete()
            .eq('id', existingVote.id);

          if (error) {
            console.error('Error while deleting vote: ', error);
            return;
          }
          // Update the local state to reflect the vote deletion
          const updatedPosts = posts?.map((post) => {
            if (post.id === postId) {
              return upvote
                ? { ...post, upvotes: post.upvotes - 1 }
                : { ...post, downvotes: post.downvotes - 1 };
            }
            return post;
          });
          setPosts(updatedPosts || null);
        } else {
          // Update the existing vote
          const { error: updateError } = await supabaseClient
            .from('UserPostVotes')
            .update({ upvote })
            .eq('id', existingVote.id);

          if (updateError) {
            console.error('Error updating vote:', updateError);
            return;
          }
          // Update the local state
          const updatedPosts = posts?.map((post) => {
            if (post.id === postId) {
              return upvote
                ? {
                    ...post,
                    upvotes: post.upvotes + 1,
                    downvotes: post.downvotes - 1,
                  }
                : {
                    ...post,
                    upvotes: post.upvotes - 1,
                    downvotes: post.downvotes + 1,
                  };
            }
            return post;
          });
          setPosts(updatedPosts || null);
        }
      } else {
        // If the user hasn't voted yet, insert a new vote
        const { error: insertError } = await supabaseClient
          .from('UserPostVotes')
          .insert({
            post_id: postId,
            user_id: user?.id ?? 0,
            upvote,
          });

        if (insertError) {
          console.error('Error inserting vote:', insertError);
          return;
        }

        // Update the local state
        const updatedPosts = posts?.map((post) => {
          if (post.id === postId) {
            return upvote
              ? { ...post, upvotes: post.upvotes + 1 }
              : { ...post, downvotes: post.downvotes + 1 };
          }
          return post;
        });
        setPosts(updatedPosts || null);
      }
    } catch (error) {
      console.error('Unexpected error while handling vote:', error);
    }
  };

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
                      onClick={() => handleUpvote(post.id, true)}
                    >
                      <IconArrowUp size="1rem" />
                    </ActionIcon>
                    <Text size="sm">{post.upvotes}</Text>
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => handleUpvote(post.id, false)}
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

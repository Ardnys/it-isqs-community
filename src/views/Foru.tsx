import {
  Card,
  Title,
  Text,
  Avatar,
  Group,
  Stack,
  Tooltip,
  Divider,
  Skeleton,
  Container,
  ActionIcon,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ForumCommentListing from '../components/ForumCommentListing';
import ReplyForm from '../components/ReplyForm';
import { supabaseClient } from '../supabase/supabaseClient';
import { IconArrowUp, IconArrowDown, IconX } from '@tabler/icons-react';
import handlePostVote, { fetchPostVotes } from '../Utils/PostVoteHandler';
import { useStore } from '@nanostores/react';
import { $registeredUser } from '../global-state/user';
import { notifications } from '@mantine/notifications';

const Foru = () => {
  const { id } = useParams();
  const [forumPost, setForumPost] = useState<ForumPost | null>(null);
  const user = useStore($registeredUser);

  useEffect(() => {
    const fetchForumPost = async () => {
      const { data, error } = await supabaseClient
        .from('ForumPost')
        .select(
          `
          id,
          title,
          creation_date,
          user_id,
          body,
          RegisteredUser:user_id(name, surname, email, pfp_url)
        `,
        )
        .eq('id', Number(id))
        .single();

      if (error) {
        notifications.show({
          title: 'Error',
          message: error.message,
          color: 'red',
          icon: <IconX size={16} />,
          autoClose: 4000,
          position: 'top-center',
        });
        return;
      }

      const { upvotes, downvotes } = await fetchPostVotes(Number(id));

      setForumPost({
        id: data.id,
        title: data.title || '',
        creation_date: data.creation_date,
        upvotes,
        downvotes,
        user_id: data.user_id || 0,
        body: data.body || '',
        num_replies: 0,
        RegisteredUser: {
          name: data.RegisteredUser?.name || '',
          surname: data.RegisteredUser?.surname || '',
          email: data.RegisteredUser?.email || '',
          pfp_url: data.RegisteredUser?.pfp_url || '',
        },
      });
    };

    fetchForumPost();
  }, [id]);

  const handleVoteClick = async (isUpvote: boolean) => {
    if (!user?.id) {
      notifications.show({
        title: 'Error',
        message: 'Please log in or create an account to vote discussions.',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 4000,
        position: 'top-center',
      });
      return;
    }

    try {
      await handlePostVote(
        forumPost!.id,
        isUpvote,
        user.id,
        forumPost!,
        (value) => setForumPost(value as ForumPost | null),
      );
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: 'Something wrong happened',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 4000,
        position: 'top-center',
      });
    }
  };

  return (
    <Container size="lg" py="lg">
      <Stack gap="xl">
        {forumPost ? (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="xs">
              <Title order={2}>{forumPost.title}</Title>
              <Group align="center" gap="sm">
                <Avatar src={forumPost.RegisteredUser?.pfp_url} radius="xl" />
                <Tooltip label={forumPost.RegisteredUser?.email}>
                  <Text size="sm" fw={500}>
                    {forumPost.RegisteredUser?.name}{' '}
                    {forumPost.RegisteredUser?.surname}
                  </Text>
                </Tooltip>
                <Text size="xs" c="dimmed">
                  {new Date(forumPost.creation_date).toLocaleString()}
                </Text>
              </Group>
              <Text
                dangerouslySetInnerHTML={{
                  __html: forumPost.body || '<i> No content </i>',
                }}
              />
              <Group mt="xs" gap="xs">
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() => handleVoteClick(true)}
                >
                  <IconArrowUp size={16} />
                </ActionIcon>
                <Text size="sm">{forumPost.upvotes}</Text>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() => handleVoteClick(false)}
                >
                  <IconArrowDown size={16} />
                </ActionIcon>
                <Text size="sm">{forumPost.downvotes}</Text>
              </Group>
            </Stack>
          </Card>
        ) : (
          <Skeleton height={140} radius="md" />
        )}

        <Divider label="Discussion" labelPosition="center" my="md" />
        <ForumCommentListing postId={Number(id)} />
        <Divider
          label="Add a reply to this post"
          labelPosition="center"
          my="md"
        />
        <ReplyForm
          postId={Number(id)}
          onSuccess={() => window.location.reload()}
        />
      </Stack>
    </Container>
  );
};

export default Foru;

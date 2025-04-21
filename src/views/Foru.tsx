import { use, useEffect, useState } from 'react';
import ForumCommentListing from '../components/ForumCommentListing';
import { supabaseClient } from '../supabase/supabaseClient';
import { useParams } from 'react-router-dom';
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
import ReplyForm from '../components/ReplyForm';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';
import handlePostVote, { fetchPostVotes } from '../Utils/PostVoteHandler';
import { useStore } from '@nanostores/react';
import { $registeredUser } from '../global-state/user';

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
        console.error('Error while fetching forum post: ', error);
        return;
      }
      const { upvotes, downvotes } = await fetchPostVotes(Number(id));
      setForumPost({
        id: data.id,
        title: data.title || '',
        creation_date: data.creation_date,
        upvotes: upvotes,
        downvotes: downvotes,
        user_id: data.user_id || 0,
        body: data.body || '',
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
                  onClick={() =>
                    handlePostVote(
                      forumPost.id,
                      true,
                      user?.id ?? 0,
                      forumPost,
                      (value) => setForumPost(value as ForumPost | null),
                    )
                  }
                >
                  <IconArrowUp size={16} />
                </ActionIcon>
                <Text size="sm">{forumPost.upvotes}</Text>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() =>
                    handlePostVote(
                      forumPost.id,
                      false,
                      user?.id ?? 0,
                      forumPost,
                      (value) => setForumPost(value as ForumPost | null),
                    )
                  }
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

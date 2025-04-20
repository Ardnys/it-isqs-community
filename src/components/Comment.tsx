import { useState } from 'react';
import {
  Avatar,
  Paper,
  Text,
  Group,
  Stack,
  Collapse,
  Button,
  Blockquote,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconMessageCircle,
} from '@tabler/icons-react';
import { CommentNode } from './ForumCommentListing';

const Comment = ({ comment }: { comment: CommentNode }) => {
  const [opened, setOpened] = useState(true);
  const hasReplies = comment.replies.length > 0;

  return (
    <Stack gap="sm" ml={comment.parent_comment_id ? 'lg' : 0}>
      <Paper shadow="xs" radius="md" p="md" withBorder>
        <Group align="flex-start">
          <Group align="flex-start">
            <Avatar alt={comment.user.name} radius="xl" size="md">
              {comment.user.name.charAt(0)}
            </Avatar>
            <div>
              <Text fw={500}>
                {comment.user.name} {comment.user.surname || ''}
              </Text>
              <Text size="sm" c="dimmed">
                {comment.date
                  ? new Date(comment.date).toLocaleString()
                  : 'Invalid date'}
              </Text>
              {comment.parent_comment_id ? (
                <Blockquote
                  color="teal"
                  iconSize={36}
                  cite={`— ${comment.parent?.user.name} ${comment.parent?.user.surname || ''}`}
                  icon={<IconMessageCircle />}
                  mt="xl"
                >
                  <Text size="sm" c="dimmed" lineClamp={4}>
                    {comment.parent?.body}
                  </Text>
                </Blockquote>
              ) : null}
              <Text mt="xs" size="sm">
                {comment.body}
              </Text>
            </div>
          </Group>

          {hasReplies && (
            <Button
              variant="subtle"
              size="xs"
              onClick={() => setOpened((o) => !o)}
              leftSection={
                opened ? (
                  <IconChevronUp size={14} />
                ) : (
                  <IconChevronDown size={14} />
                )
              }
            >
              {opened ? 'Hide replies' : 'Show replies'}
            </Button>
          )}
        </Group>
      </Paper>

      {/* Replies Collapse */}
      {hasReplies && (
        <Collapse in={opened}>
          <Stack gap="sm" mt="xs">
            {comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </Stack>
        </Collapse>
      )}
    </Stack>
  );
};

export default Comment;

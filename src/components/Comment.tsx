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
  ActionIcon,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconMessageCircle,
  IconArrowUp,
  IconArrowDown,
} from '@tabler/icons-react';
import { CommentNode } from './ForumCommentListing';
import ReplyForm from './ReplyForm';

const Comment = ({ comment }: { comment: CommentNode }) => {
  const [opened, setOpened] = useState(true);
  const [replying, setReplying] = useState(false);
  const hasReplies = comment.replies.length > 0;

  const handleReplySuccess = () => {
    setReplying(false);
    window.location.reload(); // Can be improved
  };

  return (
    <Stack gap="xs" ml={comment.parent_comment_id ? 'lg' : 0}>
      <Paper shadow="xs" radius="md" p="md" withBorder>
        <Stack gap="xs">
          {/* Top row: Avatar + Name + Date */}
          <Group align="flex-start" gap="sm">
            <Avatar alt={comment.user.name} radius="xl" size="md">
              {comment.user.name.charAt(0)}
            </Avatar>
            <Stack gap={2} style={{ flex: 1 }}>
              <Group gap="xs">
                <Text fw={500}>
                  {comment.user.name} {comment.user.surname || ''}
                </Text>
                <Text size="xs" c="dimmed">
                  •{' '}
                  {comment.date
                    ? new Date(comment.date).toLocaleString()
                    : 'Invalid date'}
                </Text>
              </Group>

              {/* Optional quoted parent */}
              {comment.parent_comment_id && comment.parent && (
                <Blockquote
                  color="teal"
                  iconSize={20}
                  cite={`— ${comment.parent.user.name} ${comment.parent.user.surname || ''}`}
                  icon={<IconMessageCircle size={14} />}
                  mt="xs"
                >
                  <Text size="sm" c="dimmed" lineClamp={4}>
                    {comment.parent.body}
                  </Text>
                </Blockquote>
              )}

              {/* Body */}
              <Text size="sm" mt="xs">
                {comment.body}
              </Text>
            </Stack>
          </Group>

          {/* Action Row */}
          <Group mt="xs" gap="xs">
            <ActionIcon variant="subtle" color="gray">
              <IconArrowUp size={16} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconArrowDown size={16} />
            </ActionIcon>

            <Button
              size="xs"
              variant="subtle"
              color="gray"
              onClick={() => setReplying((r) => !r)}
            >
              {replying ? 'Cancel' : 'Reply'}
            </Button>

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

          {/* Inline reply form */}
          {replying && (
            <ReplyForm
              postId={comment.post_id}
              parentCommentId={comment.id}
              onSuccess={handleReplySuccess}
            />
          )}
        </Stack>
      </Paper>

      {/* Nested Replies */}
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

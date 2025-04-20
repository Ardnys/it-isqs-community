import {
  Card,
  Group,
  Text,
  Image,
  Stack,
  Divider,
  Box,
  Spoiler,
  Title,
  Anchor,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

type BlogPostProps = {
  id: number;
  title: string | null;
  body: string | null;
  thumbnail: string | null;
  date: string | null;
  coAuthors?: string[];
};

const BlogPost = ({
  id,
  title,
  body,
  thumbnail,
  date,
  coAuthors = [],
}: BlogPostProps) => {
  return (
    <Card withBorder radius="md" shadow="sm" padding="lg">
      <Stack justify="space-between" style={{ height: '100%' }}>
        <Group justify="flex-start">
          <Stack justify="flex-start" gap={6} style={{ flex: 1 }}>
            <Group>
              <Title order={2}>{title || 'Untitled'}</Title>
              <Text size="sm" c="dimmed">
                {date ? new Date(date).toLocaleDateString() : ''}
              </Text>
            </Group>
            <Divider my={4} />

            <Text
              lineClamp={4}
              dangerouslySetInnerHTML={{
                __html: body || '<i>No content</i>',
              }}
            />
            <Anchor href={`/blogs/${id}`} underline="always" c="teal">
              Read more
            </Anchor>
          </Stack>

          {thumbnail && (
            <Image
              src={thumbnail}
              alt={title || 'Blog thumbnail'}
              w={240}
              h={240}
              radius="sm"
              fit="cover"
              style={{ flexShrink: 0 }}
            />
          )}
        </Group>

        {/* Co-authors at bottom right */}
        {coAuthors.length > 0 && (
          <Group justify="flex-end" mt="sm">
            <Text size="xs" c="dimmed">
              Co-authors: {coAuthors.join(', ')}
            </Text>
          </Group>
        )}
      </Stack>
    </Card>
  );
};

export default BlogPost;

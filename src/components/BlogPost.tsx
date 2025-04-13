import { Card, Group, Text, Image, Stack } from '@mantine/core';

type BlogPostProps = {
  title: string | null;
  body: string | null;
  thumbnail: string | null;
  date: string | null;
};

const BlogPost = ({ title, body, thumbnail, date }: BlogPostProps) => {
  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      style={{ display: 'flex', gap: '1rem' }}
    >
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={title || 'Blog thumbnail'}
          width={120}
          height={80}
          fit="cover"
          radius="sm"
        />
      )}

      <Stack gap="xs" style={{ flex: 1 }}>
        <Group justify="space-between">
          <Text fw={600} size="lg">
            {title || 'Untitled'}
          </Text>
          <Text size="sm" color="dimmed">
            {date ? new Date(date).toLocaleDateString() : ''}
          </Text>
        </Group>
        <Text size="sm" lineClamp={2}>
          {body || 'No content'}
        </Text>
      </Stack>
    </Card>
  );
};

export default BlogPost;

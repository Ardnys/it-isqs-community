import {
  Card,
  Group,
  Text,
  Image,
  Stack,
  Divider,
  Title,
  Anchor,
} from '@mantine/core';

type BlogPostProps = {
  id: number;
  title: string | null;
  body: string | null;
  thumbnail: string | null;
  date: string | null;
};

const BlogPost = ({ id, title, body, thumbnail, date }: BlogPostProps) => {
  return (
    <Card withBorder radius="md" shadow="sm" padding="lg">
      <Group justify="flex-start">
        <Stack justify="flex-start" gap={6} style={{ flex: 1 }}>
          {/* somehow these are vertically aligned in center */}
          <Group>
            <Title order={2}>{title || 'Untitled'}</Title>
            <Text size="sm" c="dimmed">
              {date ? new Date(date).toLocaleDateString() : ''}
            </Text>
          </Group>
          <Divider my={4} />

          <Text
            lineClamp={4} // limit to 4 lines if not expanded
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
    </Card>
  );
};

export default BlogPost;

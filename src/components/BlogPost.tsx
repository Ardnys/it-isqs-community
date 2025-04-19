import {
  Card,
  Group,
  Text,
  Image,
  Stack,
  Divider,
  Box,
  Spoiler,
} from '@mantine/core';

type BlogPostProps = {
  title: string | null;
  body: string | null;
  thumbnail: string | null;
  date: string | null;
};

const BlogPost = ({ title, body, thumbnail, date }: BlogPostProps) => {
  return (
    <Card withBorder radius="md" shadow="sm" padding="md">
      <Group justify="center">
        <Stack gap={6} style={{ flex: 0.45 }}>
          <Group>
            <Text fw={600} size="lg">
              {title || 'Untitled'}
            </Text>
            <Text size="sm" c="dimmed">
              {date ? new Date(date).toLocaleDateString() : ''}
            </Text>
          </Group>
          <Divider my={4} />

          <Spoiler maxHeight={150} showLabel="Read more" hideLabel="Hide">
            <Box
              style={{ lineHeight: 1.4 }}
              // This is actually suggested by docs lol: https://mantine.dev/core/typography-styles-provider/
              dangerouslySetInnerHTML={{
                __html: body || '<i>No content</i>',
              }}
            />
          </Spoiler>
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

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
  Flex,
  Avatar, // Import Avatar from Mantine
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

// BlogPost.tsx
type BlogPostProps = {
  id: number;
  title: string | null;
  body: string | null;
  thumbnail: string | null;
  date: string | null;
  coAuthors?: { name: string; avatar: string | null }[]; // Updated to match the structure you pass
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
            <Flex justify="space-between" mt="md" align="center">
              <Anchor
                href={`/blog/${title?.replace(/\s+/g, '-')}`}
                target="_blank"
              >
                Read More
              </Anchor>
              {coAuthors?.length > 0 && (
                <Group align="center">
                  <Text fz="sm" c="dimmed">
                    by
                  </Text>
                  {coAuthors.map((author, index) => (
                    <Group key={index} align="center">
                      {author.avatar && (
                        <Avatar
                          src={author.avatar}
                          alt={author.name}
                          size={24}
                        />
                      )}
                      <Text fz="sm" c="dimmed">
                        {author.name}
                      </Text>
                      {index < coAuthors.length - 1 && (
                        <Divider orientation="vertical" mx={8} />
                      )}
                    </Group>
                  ))}
                </Group>
              )}
            </Flex>
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
      </Stack>
    </Card>
  );
};

export default BlogPost;

import {
  Card,
  Group,
  Text,
  Image,
  Stack,
  Divider,
  Title,
  Flex,
  Avatar,
  Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const BlogPost = ({
  id,
  title,
  body,
  thumbnail,
  date,
  coAuthors = [],
}: Blog) => {
  const navigate = useNavigate();

  return (
    <Card withBorder radius="md" shadow="sm" padding="lg">
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap="lg"
        justify="space-between"
      >
        {/* Text Section */}
        <Stack justify="space-between" style={{ flex: 1 }}>
          <Stack gap="xs">
            <Group gap="sm" wrap="nowrap">
              <Title order={2} style={{ flex: 1 }}>
                {title || 'Untitled'}
              </Title>
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
          </Stack>

          {/* Footer: Read more + authors */}
          <Flex
            justify="space-between"
            mt="md"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Button
              variant="subtle"
              color="teal"
              onClick={() => navigate(`/blogs/${id}`)}
            >
              Read more
            </Button>
            {coAuthors?.length > 0 && (
              <Group align="center" wrap="wrap">
                <Text fz="sm" c="dimmed">
                  by
                </Text>
                {coAuthors.map((author, index) => (
                  <Group key={index} align="center" wrap="wrap">
                    {author.avatar && (
                      <Avatar src={author.avatar} alt={author.name} size={24} />
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

        {/* Thumbnail Image */}
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={title || 'Blog thumbnail'}
            w={{ base: '100%', sm: 240 }}
            h={{ base: 180, sm: 240 }}
            radius="sm"
            fit="cover"
            style={{ flexShrink: 0 }}
          />
        )}
      </Flex>
    </Card>
  );
};

export default BlogPost;

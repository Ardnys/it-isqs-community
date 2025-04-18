import { Box, Container, Grid, Group, Stack, Text, Title, Anchor, rem } from '@mantine/core';
import { IconMail, IconPhone, IconWorld } from '@tabler/icons-react';

function Contact() {
  return (
    <Box>
      <Container size="md" py="lg">
        <Title order={2} ta="center" mb="xl">
          Contact Us
        </Title>

        <Grid>
          {/* Left Column: Contact Info */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="lg">
              <Group align="center" gap="sm">
                <IconWorld size={20} />
                <Text>
                  Website:{' '}
                  <Anchor href="https://www.cankaya.edu.tr" target="_blank" rel="noopener noreferrer">
                    https://www.cankaya.edu.tr
                  </Anchor>
                </Text>
              </Group>

              <Group align="center" gap="sm">
                <IconPhone size={20} />
                <Text>Phone: +903122331291</Text>
              </Group>

              <Group align="center" gap="sm">
                <IconMail size={20} />
                <Text>Email: it_isqs@gmail.com</Text>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Right Column: Image Placeholder */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              style={{
                width: '100%',
                height: rem(200),
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px dashed #ccc',
              }}
            >
              <Text c="dimmed">[Image or Map Placeholder]</Text>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}

export default Contact;


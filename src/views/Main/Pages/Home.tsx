import { Box, Container, Group, Paper, Stack, Text, Title } from '@mantine/core';

function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Container size="lg" py="lg" mt="md">
        <Group justify="space-between" align="start" wrap="wrap">
          <Stack gap="xs" maw={500}>
            <Title order={2}>
              Innovative Training for International
              <br />
              Software Quality Standards
            </Title>
            <Text c="dimmed" style={{ lineHeight: 1.6 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              vulputate tempus lacus, vel tempus tellus facilisis et. Nam
              gravida non quam ac tempor.
            </Text>
          </Stack>
        </Group>
      </Container>

      {/* About Section */}
      <Container size="lg" py="lg" mt="xl">
        <Group justify="center">
          <Paper
            p="md"
            shadow="xs"
            radius="md"
            withBorder
            style={{ maxWidth: 600, width: '100%' }}
          >
            <Stack align="center" gap="xs">
              <Title order={4} ta="center">About</Title>
              <Text c="dimmed" ta="center" size="sm" style={{ lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                vulputate tempus lacus, vel tempus tellus facilisis et. Nam
                gravida non quam ac tempor.
              </Text>
            </Stack>
          </Paper>
        </Group>
      </Container>
    </Box>
  );
}

export default Home;

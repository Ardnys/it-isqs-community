import { Box, Container, Grid, Image, Stack, Text, Title } from '@mantine/core';

function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="#0B1E3B" py="xl">
        <Container size="lg">
          <Grid align="center">
            {/* Left Side - Text */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="xs">
                <Text size="sm" c="gray.4" fw={500}>WELCOME TO</Text>
                <Title order={1} c="white">
                  The <Text span c="blue.4" fw={1000}>hand</Text>
                  <Text span c="green.4" fw={1000}>some</Text>
                  <Text span c="cyan.4" fw={1000}>bois</Text> Kit 4.0!
                </Title>
                <Text c="gray.3" style={{ lineHeight: 1.6 }}>
                  European Higher Education Institutions (HEIs) are increasingly engaged in society and therefore play a growing role in regional and social development. As a result of the increasing international cooperation, successful collaboration in the digital sphere is becoming more and more critical.
                </Text>
                <Text c="gray.3" style={{ lineHeight: 1.6 }}>
                  The CoCreAid Kit 4.0 focuses on overcoming barriers to cooperation arising when HEIs and NGOs co-create digitally. The aim is to increase social impact in participating European countries and beyond.
                </Text>
                <Text c="gray.3" style={{ lineHeight: 1.6 }}>
                  This website guides you through the wide variety of digital platforms and co-creation methods. Additionally, you will find best practices for successful digital co-creation.
                </Text>
              </Stack>
            </Grid.Col>

            {/* Right Side - Image */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image
                src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=800&q=80"
                alt="Students Collaborating"
                radius="md"
                fit="cover"
              />
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* About Us Section */}
      <Box bg="white" py="xl">
        <Container size="lg">
          <Grid align="center">
            {/* Left Side - Image */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                alt="Person writing"
                radius="md"
                fit="cover"
              />
            </Grid.Col>

            {/* Right Side - Text */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack>
                <Title order={3} c="dark">Introducing Us</Title>
                <Text c="gray.7" style={{ lineHeight: 1.6 }}>
                  Research conducted by MUAS has shown that due to the pandemic situation,
                  a large number of co-creation projects fail due to a lack of appropriate methods
                  and tools for collaborations.
                </Text>
                <Text c="gray.7" style={{ lineHeight: 1.6 }}>
                  Therefore, a digital CoCreAid Kit could support the collaboration between HEIs
                  and NGOs to overcome these barriers and to continue and strengthen the cooperations.
                  Co-creation tools are methods that enable co-creation activities throughout the whole process.
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;

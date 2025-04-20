import {
  Box,
  Container,
  Grid,
  Image,
  Stack,
  Text,
  Title,
  Group,
} from '@mantine/core';
import {
  IconTarget,
  IconActivity,
  IconTrendingUp,
} from '@tabler/icons-react';

function Home() {
  return (
    <Box>

      {/* Hero Section */}
      <Box bg="#0B1E3B" py={80}>
        <Container size="lg">
          <Grid align="center">
            {/* Left Side - Text */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="xs">
                <Text size="sm" c="gray.4" fw={500}>
                  WELCOME TO
                </Text>
                <Title order={1} c="white">
                  Erasmus+ Programme
                </Title>
                <Text size="lg" c="gray.3" fw={600}>
                  Enriching lives, opening minds
                </Text>
                <Text c="gray.3" size="md" lh={1.7}>
                  Erasmus+ is the EU’s programme to support education, training, youth and sport in Europe and beyond. It provides opportunities for people of all ages to learn and share experiences across borders.
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

      {/* About Erasmus+ Section */}
      <Box bg="white" py={80}>
        <Container size="lg">
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                alt="Person writing"
                radius="md"
                fit="cover"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack>
                <Title order={3} c="dark">About Erasmus+</Title>
                <Text c="gray.7" size="md" lh={1.7}>
                  Erasmus+ aims to support the educational, professional, and personal development of individuals in education, training, youth, and sport. It contributes to sustainable growth, quality jobs, and social cohesion, while promoting innovation and strengthening European identity and active citizenship.
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Erasmus+ Priorities Section */}
      <Box bg="gray.1" py={80}>
        <Container size="lg">
          <Title order={2} mb="md" c="dark">Erasmus+ Priorities</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Box p="md" bg="white" style={{ borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', transition: '0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'; }}>
                <Group mb="xs">
                  <IconTarget size={24} color="#1c7ed6" />
                  <Title order={4} c="blue.9">Inclusion and Diversity</Title>
                </Group>
                <Text c="gray.8" size="sm">
                  Promoting equal opportunities and access, inclusion, diversity, and fairness across all actions. The programme supports participants with fewer opportunities and aims to make its activities accessible to a diverse range of participants.
                </Text>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
            <Box p="md" bg="white" style={{ borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', transition: '0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'; }}>
            <Group mb="xs">
                  <IconActivity size={24} color="#1c7ed6" />
                  <Title order={4} c="blue.9">Digital Transformation</Title>
                </Group>
                <Text c="gray.8" size="sm">
                  Supporting the development of digital skills and the adoption of digital technologies in education, training, and youth work. Erasmus+ aims to enhance digital literacy and foster innovative practices.
                </Text>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
            <Box p="md" bg="white" style={{ borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', transition: '0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'; }}>
            <Group mb="xs">
                  <IconTrendingUp size={24} color="#1c7ed6" />
                  <Title order={4} c="blue.9">Participation in Democratic Life</Title>
                </Group>
                <Text c="gray.8" size="sm">
                  Encouraging active citizenship and ethics in lifelong learning. The programme fosters social and intercultural competencies, critical thinking, and media literacy, promoting engagement in democratic processes.
                </Text>
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

     
    </Box>
  );
}

export default Home;

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
                Innovative Training for International Software Quality Standards
                </Title>
                <Text size="lg" c="gray.3" fw={600}>
                 Quality and customer satisfaction
                </Text>
                <Text c="gray.3" size="md" lh={1.7}>
                The IT-ISQS project's aim is to address the vital need for coverage of international software quality standards in higher education to raise awareness among engineers and industry. By incorporating innovative teaching methods such as gamification, real-life case studies,                </Text>
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
                <Title order={3} c="dark">About IT-ISQS</Title>
                <Text c="gray.7" size="md" lh={1.7}>
                The IT-ISQS project aims to enhance higher education by integrating international software quality standards into engineering curricula. Through innovative methods like gamification, AI tools, and real-life case studies, the project seeks to make learning more engaging and aligned with global standards. Activities include course development, pilot testing, and collaboration with academia and industry. T                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Erasmus+ Priorities Section */}
      <Box bg="gray.1" py={80}>
        <Container size="lg">
          <Title order={2} mb="md" c="dark">IT-ISQS  Priorities</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Box p="md" bg="white" style={{ borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', transition: '0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'; }}>
                <Group mb="xs">
                  <IconTarget size={24} color="#1c7ed6" />
                  <Title order={4} c="blue.9">Objectives
                  </Title>
                </Group>
                <Text c="gray.8" size="sm">
                The IT-ISQS project's aim is to address the vital need for coverage of international software quality standards in higher education to raise awareness among engineers and industry. By incorporating innovative teaching methods such as gamification, real-life case studies, interactive class activities, and AI integration, the project aims to make learning engaging and relevant for students. The project will also update curricula to ensure related engineering programs align with global standards.                </Text>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
            <Box p="md" bg="white" style={{ borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', transition: '0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'; }}>
            <Group mb="xs">
                  <IconActivity size={24} color="#1c7ed6" />
                  <Title order={4} c="blue.9">Activities
                  </Title>
                </Group>
                <Text c="gray.8" size="sm">
                IT-ISQS project activities: scientific literature review, surveys, industry interviews and statistical analysis; building new course design via creating novel teaching materials, AI tools, games, interactive exercises, and case studies; testing the course by pilot programs, collecting feedback, and analyzing it; collaborating with faculty and industry experts to finalize the course design; dissemination activities via community website, academic papers, workshops, meet-ups and multiplier events                </Text>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
            <Box p="md" bg="white" style={{ borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', transition: '0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'; }}>
            <Group mb="xs">
                  <IconTrendingUp size={24} color="#1c7ed6" />
                  <Title order={4} c="blue.9">Impact</Title>
                </Group>
                <Text c="gray.8" size="sm">
                  The IT-ISQS project intends to empower;
                  Improvement of international software quality standards(ISQS) course syllabus via innovative and enriched content.
                  Comprehensive coverage of ISQS in software engineering and related curricula.
                  Increased motivation for students and professors with innovative course content.
                  Enhanced awareness and knowledge among emerging engineers about ISO/IEC software standards.
                  AI-based tools to support standards training.
                  Internationalization with partner organization              
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

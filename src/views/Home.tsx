import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Timeline,
  Card,
  Divider,
  Image,
  Group,
} from '@mantine/core';
import {
  IconBook2,
  IconBulb,
  IconCertificate,
  IconRocket,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 },
  }),
};

const MotionStack = motion(Stack);

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container size="lg" py="xl">
      {/* Hero Section */}
      <MotionStack
        gap="md"
        align="center"
        mb="xl"
        component={motion.div}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeIn} custom={0}>
          <Image
            src="/assets/collaboration.svg"
            alt="Erasmus Banner"
            radius="md"
            w="100%"
            maw={800}
            mx="auto"
            mb="md"
          />
        </motion.div>

        <motion.div variants={fadeIn} custom={1}>
          <Title order={1} ta="center" size="3rem">
            IT-ISQS Erasmus+ Project
          </Title>
        </motion.div>

        <motion.div variants={fadeIn} custom={2}>
          <Text ta="center" size="lg" c="dimmed" maw={700}>
            Enhancing software engineering education with international quality
            standards, gamification, AI integration, and innovative teaching
            methods.
          </Text>
        </motion.div>

        <motion.div variants={fadeIn} custom={3}>
          <Button size="lg" color="teal" onClick={() => navigate('/forum')}>
            Join the Discussion
          </Button>
        </motion.div>
      </MotionStack>

      <Divider my="xl" />

      {/* About Section */}
      <MotionStack
        gap="xl"
        component={motion.div}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeIn} custom={0}>
          <Title order={2}>About the Project</Title>
        </motion.div>

        <motion.div variants={fadeIn} custom={1}>
          <Text size="md">
            The <strong>IT-ISQS</strong> project addresses the crucial need to
            improve awareness and understanding of international software
            quality standards (ISQS) in higher education. By integrating
            gamification, real-life case studies, interactive activities, and AI
            tools, it aims to create engaging and effective learning
            environments for future engineers.
          </Text>
        </motion.div>

        {/* Cards with images */}
        {[
          {
            title: 'Objectives',
            img: '/assets/seng.svg',
            text: `✓ Modernize software engineering curricula by embedding ISQS.
✓ Use AI, gamification, and real-world cases to improve engagement.
✓ Foster collaboration between academia and industry.
✓ Empower students and educators with innovative content.`,
          },
          {
            title: 'Activities',
            img: '/assets/inspection.png',
            text: `✓ Literature review, surveys, and interviews with industry experts.
✓ Designing courses and teaching materials with AI support.
✓ Pilot programs and feedback collection.
✓ Dissemination through meetups, workshops, and papers.`,
          },
          {
            title: 'Expected Impact',
            img: '/assets/quality.png',
            text: `✓ Improved coverage of ISQS in education.
✓ Boosted student motivation and skill levels.
✓ Increased awareness of ISO/IEC standards.
✓ Strengthened international academic collaboration.`,
          },
        ].map((section, i) => (
          <motion.div key={section.title} variants={fadeIn} custom={i + 2}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Group align="flex-start">
                <Image src={section.img} w={100} h={100} alt={section.title} />
                <Stack gap={4}>
                  <Title order={3}>{section.title}</Title>
                  <Text>{section.text}</Text>
                </Stack>
              </Group>
            </Card>
          </motion.div>
        ))}
      </MotionStack>

      <Divider my="xl" />

      {/* Timeline */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        custom={6}
      >
        <Title order={2} mb="md">
          Project Timeline
        </Title>
        <Timeline active={3} bulletSize={28} lineWidth={2}>
          <Timeline.Item
            bullet={<IconBook2 size={16} />}
            title="Kick-off & Research"
          >
            <Text c="dimmed" size="sm">
              Jan 2024 – Mar 2024
            </Text>
            <Text size="sm">
              Initial research, literature review, and stakeholder interviews.
            </Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconBulb size={16} />}
            title="Design & Development"
          >
            <Text c="dimmed" size="sm">
              Apr 2024 – Jul 2024
            </Text>
            <Text size="sm">
              Creation of course materials, AI tools, and gamified activities.
            </Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconCertificate size={16} />}
            title="Pilot & Feedback"
          >
            <Text c="dimmed" size="sm">
              Aug 2024 – Nov 2024
            </Text>
            <Text size="sm">
              Pilot programs run in partner universities with active feedback
              loops.
            </Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconRocket size={16} />}
            title="Finalization & Dissemination"
          >
            <Text c="dimmed" size="sm">
              Dec 2024 – May 2025
            </Text>
            <Text size="sm">
              Finalizing curriculum, publishing findings, organizing events and
              workshops.
            </Text>
          </Timeline.Item>
        </Timeline>
      </motion.div>
    </Container>
  );
}

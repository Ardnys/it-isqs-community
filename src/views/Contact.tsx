import {
  Box,
  Container,
  Grid,
  Group,
  Text,
  Title,
  Anchor,
  rem,
  Accordion,
} from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons-react';

// Themed section card with color props
const SectionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  bgColor: string;
  textColor?: string;
}> = ({ icon, title, children, bgColor, textColor = '#212529' }) => (
  <Box
    p="lg"
    mb="md"
    style={{
      backgroundColor: bgColor,
      borderRadius: rem(10),
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
      color: textColor,
    }}
  >
    <Title order={3} mb="xs" style={{ color: textColor }}>
      {icon} {title}
    </Title>
    <Text size="sm">{children}</Text>
  </Box>
);

function Contact() {
  return (
    <Box>
      <Container size="md" py="lg">
        <Title order={2} ta="center" mb="xl">
          Contact Us
        </Title>

        {/* Contact and Coordinator Info */}
        <Grid
          gutter="md"
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
          align="stretch"
        >
           {/* Participants Countries */}
           <Grid.Col span={{ base: 12, md: 6 }}>
           <Box
               p="md"
               bg="white"
               style={{
                 height: '100%',
                 border: '1px solid #ced4da',
                 borderRadius: rem(8),
                 boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                 display: 'flex',
                 flexDirection: 'column',
              }}
            >
              <Title order={4} mb="sm">Participants countries</Title>
              <Text fw={700}>Netherlands</Text>
              <Text fw={700}>Spain</Text>
              <Text fw={700}>Türkiye</Text>
            </Box>
          </Grid.Col>

          {/* Coordinator Info */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              p="md"
              bg="white"
              style={{
                height: '100%',
                border: '1px solid #ced4da',
                borderRadius: rem(8),
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Title order={4} mb="sm">Coordinator</Title>
              <Text fw={700}>CANKAYA UNIVERSITESI</Text>
              <Text>OGRETMENLER CADDESI 14 BALGAT</Text>
              <Text>06530 ANKARA</Text>
              <Text>Ankara</Text>
              <Text>🇹🇷 <strong>Türkiye</strong></Text>

              <Text mt="sm">
                <strong>Coordinator Type:</strong> Higher education institution (tertiary level)
              </Text>
              <Text>
                <strong>Website:</strong>{' '}
                <Anchor
                  href="https://www.cankaya.edu.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.cankaya.edu.tr
                </Anchor>
              </Text>
              <Text>
                <strong>Phone:</strong> +903122331291
              </Text>
            </Box>
          </Grid.Col>

         
        </Grid>

        {/* Objectives / Activities / Impact */}
        <Container size="md" my="xl">
          <SectionCard
            icon="📌"
            title="Objectives"
            bgColor="#d4edda"
            textColor="#155724"
          >
            The IT-ISQS project enhances higher education by integrating international software quality standards
            into engineering programs using gamification, AI, and real-world cases.
          </SectionCard>

          <SectionCard
            icon="🛠️"
            title="Activities"
            bgColor="#f8d7da"
            textColor="#721c24"
          >
            Activities include literature reviews, surveys, course development with interactive tools and case studies,
            pilot testing, expert collaboration, and broad dissemination through academic and community channels.
          </SectionCard>

          <SectionCard
            icon="🌍"
            title="Impact"
            bgColor="#d1ecf1"
            textColor="#0c5460"
          >
            The project will lead to improved ISQS curricula, higher motivation, enhanced awareness of ISO/IEC standards,
            AI-supported training, and stronger international collaboration.
          </SectionCard>
        </Container>

        {/* Partners Section */}
        <Box bg="white" py="sm">
          <Container size="lg">
            <Title order={3} mb="md">Partners</Title>

            <Accordion
              chevronPosition="left"
              multiple={true}
              variant="default"
              transitionDuration={200}
              chevron={
                <>{({ opened }: { opened: boolean }) =>
                  opened ? <IconX size={20} color="#c62828" /> : <IconPlus size={20} color="#2e7d32" />
                }</>
              }
              classNames={{
                item: 'accordion-item',
                control: 'accordion-control',
                content: 'accordion-content',
              }}
            >
              {/* Partner 1 */}
              <Accordion.Item value="ufv">
                <Accordion.Control>
                  <Group>
                    <Text fw={600}>FUNDACION UNIVERSIDAD FRANCISCO DE VITORIA 🇪🇸</Text>
                    <Text c="gray.6">Spain</Text>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text>
                    CARRETERA M515 POZUELO-MAJADAHONDA KM 1,8 S/N<br />
                    28223 POZUELO DE ALARCON<br />
                    Comunidad de Madrid<br />
                    <strong>🇪🇸 Spain</strong>
                  </Text>
                  <Text mt="sm">
                    <strong>Partner Type:</strong> Higher education institution (tertiary level)
                  </Text>
                  <Group mt="xs" gap="md" wrap="wrap">
                    <Text>
                      <strong>Website:</strong>{' '}
                      <Anchor href="https://www.ufv.es" target="_blank" rel="noopener noreferrer">
                        https://www.ufv.es
                      </Anchor>
                    </Text>
                    <Text>
                      <strong>Phone:</strong> +34 917091400
                    </Text>
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>

              {/* Partner 2 */}
              <Accordion.Item value="partner2">
                <Accordion.Control>
                  <Group>
                    <Text fw={600}>OPEN UNIVERSITEIT 🇳🇱</Text>
                    <Text c="gray.6">Netherlands</Text>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text>
                    VALKENBURGERWEG 177<br />
                    6419 AT HEERLEN<br />
                    Limburg (NL)<br />
                    <strong>🇳🇱 Netherlands</strong>
                  </Text>
                  <Text mt="sm">
                    <strong>Partner Type:</strong> Higher education institution (tertiary level)
                  </Text>
                  <Group mt="xs" gap="md" wrap="wrap">
                    <Text>
                      <strong>Website:</strong>{' '}
                      <Anchor href="https://www.ou.nl" target="_blank" rel="noopener noreferrer">
                        https://www.ou.nl
                      </Anchor>
                    </Text>
                    <Text>
                      <strong>Phone:</strong> +31 455762222
                    </Text>
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>

              {/* Partner 3 */}
              <Accordion.Item value="partner3">
                <Accordion.Control>
                  <Group>
                    <Text fw={600}>TED UNIVERSITESI 🇹🇷</Text>
                    <Text c="gray.6">Türkiye</Text>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text>
                    ZIYA GOKALP CADDESI 48<br />
                    06420 CANKAYA ANKARA<br />
                    <strong>🇹🇷 Türkiye</strong>
                  </Text>
                  <Text mt="sm">
                    <strong>Partner Type:</strong> Higher education institution (tertiary level)
                  </Text>
                  <Group mt="xs" gap="md" wrap="wrap">
                    <Text>
                      <strong>Website:</strong>{' '}
                      <Anchor href="https://www.tedu.edu.tr" target="_blank" rel="noopener noreferrer">
                        https://www.tedu.edu.tr
                      </Anchor>
                    </Text>
                    <Text>
                      <strong>Phone:</strong> +90 312 585 00 00
                    </Text>
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Container>
        </Box>
      </Container>
    </Box>
  );
}

export default Contact;

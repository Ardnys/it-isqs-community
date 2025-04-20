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
import { IconMail, IconPhone, IconWorld, IconPlus, IconX } from '@tabler/icons-react';

function Contact() {
  return (
    <Box>
      <Container size="md" py="lg">
        <Title order={2} ta="center" mb="xl">
          Contact Us
        </Title>

        <Grid
  gutter="md"
  style={{
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  }}
  align="stretch"
>
  {/* Contact Info */}
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
      <Title order={4} mb="sm">Contact</Title>
      <Text>
        <strong></strong>{' '}
        <Anchor
          
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </Anchor>
      </Text>
      <Text mt="xs">
        <strong>Phone:</strong> +90 312 233 1291
      </Text>
      <Text mt="xs">
        <strong>Email:</strong> it_isqs@gmail.com
      </Text>
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

  <Grid.Col span={{ base: 12, md: 12 }}>
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
      <Title order={4} mb="sm">Participants countries
      </Title>
      <Text fw={700}>Netherlands, Spain, Türkiye
      </Text>
    </Box>
  </Grid.Col>
</Grid>


        {/* Partners Section */}
        <Box bg="white" py="sm">
          <Container size="lg">
            <Title order={3} mb="md">Partners</Title>

            <Accordion
              chevronPosition="left"
              multiple={false}
              variant="default"
              transitionDuration={200}
              chevron={({ opened }) =>
                opened ? <IconX size={20} /> : <IconPlus size={20} />
              }
              styles={{
                item: {
                  border: '1px solid #adb5bd',
                  borderRadius: 6,
                  marginBottom: 12,
                  backgroundColor: '#fff',
                  padding: '8px 12px',
                },
                itemOpened: {
                  backgroundColor: '#e9f5fb',
                },
                control: {
                  fontWeight: 600,
                  fontSize: '16px',
                },
                content: {
                  paddingTop: 10,
                  fontSize: '14px',
                  lineHeight: 1.6,
                },
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
                      <Anchor
                        href="https://www.ufv.es"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
                      <Anchor
                        href="https://www.ou.nl"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
                      <Anchor
                        href="https://www.tedu.edu.tr"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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

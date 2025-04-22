import {
  Box,
  Container,
  Grid,
  Group,
  Text,
  Title,
  Anchor,
  Accordion,
  Badge,
  useMantineTheme,
  Card,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Image } from '@mantine/core';
import { motion } from 'framer-motion';

function Contact() {
  const theme = useMantineTheme();

  return (
    <Box>
      <Container size="md" py="lg">
        <Title order={2} ta="center" mb="xl">
          Contact Us
        </Title>

        <motion.div
          initial={{ x: '-100%' }} // Start off the screen to the left
          animate={{ x: 0 }} // Slide to the normal position
          exit={{ x: '100%' }} // Slide out to the right when it exits
          transition={{
            type: 'spring',
            stiffness: 100, // Controls how "tight" the spring is
            damping: 15, // Controls how bouncy the spring is
            duration: 0.5, // Duration of the animation
          }}
        >
          <Card padding="lg" shadow="sm" radius="md" style={{ width: '100%' }}>
            <Grid gutter="lg" align="stretch">
              {/* Coordinator Info Box */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Box p="lg">
                  <Title order={3} mb="sm">
                    Coordinator
                  </Title>
                  <Text fw={700} size="lg">
                    CANKAYA UNIVERSITESI
                  </Text>
                  <Text>OGRETMENLER CADDESI 14 BALGAT</Text>
                  <Text>06530 ANKARA</Text>
                  <Text>Ankara</Text>
                  <Text fw={600}>
                    🇹🇷 <strong>Türkiye</strong>
                  </Text>
                  <Text mt="sm">
                    <strong>Coordinator Type:</strong> Higher education
                    institution (tertiary level)
                  </Text>
                  <Text>
                    <strong>Website:</strong>{' '}
                    <Anchor
                      href="https://www.cankaya.edu.tr"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: theme.colors[theme.primaryColor][6] }}
                    >
                      https://www.cankaya.edu.tr
                    </Anchor>
                  </Text>
                  <Text>
                    <strong>Phone:</strong> +90 312 233 1291
                  </Text>
                </Box>
              </Grid.Col>
              <Grid.Col
                span={{ base: 12, md: 6 }}
                style={{ display: 'flex', alignItems: 'stretch' }}
              >
                <Box
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src="/assets/contact.svg"
                    alt="Contact Banner"
                    fit="contain"
                    w="100%"
                    h="auto"
                  />
                </Box>
              </Grid.Col>
            </Grid>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Partners Section */}
          <Box py="sm" mt="lg">
            <Container size="lg">
              <Title order={3} mb="md">
                Partners
              </Title>

              <Accordion
                chevronPosition="left"
                multiple={true}
                variant="default"
                transitionDuration={200}
                chevron={<IconPlus size={20} color={theme.colors.green[7]} />}
              >
                {/* Spain */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 100,
                    damping: 25,
                  }}
                >
                  <Accordion.Item value="ufv">
                    <Accordion.Control>
                      <Group>
                        <Text fw={600} size="md">
                          🎓 FUNDACION UNIVERSIDAD FRANCISCO DE VITORIA
                        </Text>
                        <Badge variant="light" color="red">
                          🇪🇸 Spain
                        </Badge>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text>
                        CARRETERA M515 POZUELO-MAJADAHONDA KM 1,8 S/N
                        <br />
                        28223 POZUELO DE ALARCON
                        <br />
                        Comunidad de Madrid
                        <br />
                        <strong>🇪🇸 Spain</strong>
                      </Text>
                      <Text mt="sm">
                        <strong>Partner Type:</strong>{' '}
                        <Badge color="blue" variant="filled" size="xs">
                          Higher education
                        </Badge>
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
                </motion.div>

                {/* Netherlands */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
                    type: 'spring',
                    stiffness: 100,
                    damping: 25,
                  }}
                >
                  <Accordion.Item value="partner2">
                    <Accordion.Control>
                      <Group>
                        <Text fw={600} size="md">
                          🏫 OPEN UNIVERSITEIT
                        </Text>
                        <Badge variant="light" color="indigo">
                          🇳🇱 Netherlands
                        </Badge>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text>
                        VALKENBURGERWEG 177
                        <br />
                        6419 AT HEERLEN
                        <br />
                        Limburg (NL)
                        <br />
                        <strong>🇳🇱 Netherlands</strong>
                      </Text>
                      <Text mt="sm">
                        <strong>Partner Type:</strong>{' '}
                        <Badge color="blue" variant="filled" size="xs">
                          Higher education
                        </Badge>
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
                </motion.div>

                {/* Türkiye */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.6,
                    type: 'spring',
                    stiffness: 100,
                    damping: 25,
                  }}
                >
                  <Accordion.Item value="partner3">
                    <Accordion.Control>
                      <Group>
                        <Text fw={600} size="md">
                          🏛️ TED UNIVERSITESI
                        </Text>
                        <Badge variant="light" color="yellow">
                          🇹🇷 Türkiye
                        </Badge>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text>
                        ZIYA GOKALP CADDESI 48
                        <br />
                        06420 CANKAYA ANKARA
                        <br />
                        <strong>🇹🇷 Türkiye</strong>
                      </Text>
                      <Text mt="sm">
                        <strong>Partner Type:</strong>{' '}
                        <Badge color="blue" variant="filled" size="xs">
                          Higher education
                        </Badge>
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
                </motion.div>
              </Accordion>
            </Container>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Contact;

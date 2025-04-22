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
  Badge,
  useMantineTheme,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useComputedColorScheme } from '@mantine/core';


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
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();

  const isDark = colorScheme === 'dark';

  const textColor = isDark ? theme.white : theme.black;
  const background = isDark ? theme.colors.dark[6] : theme.white;
  const border = isDark ? theme.colors.dark[4] : '#ced4da';

  const countryColors = {
    Spain: theme.colors.red[1],
    Netherlands: theme.colors.indigo[1],
    Türkiye: theme.colors.yellow[1],
  };

  const partnerPanelStyles = (country: keyof typeof countryColors) => ({
    backgroundColor: isDark
      ? `rgba(${countryColors[country]}, 0.15)`
      : countryColors[country],
    border: `1px solid ${
      isDark ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    color: theme.black, // <- this line sets text color to black
  });
  

  return (
    <Box>
      <Container size="md" py="lg">
        <Title order={2} ta="center" mb="xl" style={{ color: textColor }}>
          Contact Us
        </Title>

        <Grid gutter="md" align="stretch">
          {/* Participants Countries */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              p="md"
              style={{
                height: '100%',
                backgroundColor: background,
                border: `1px solid ${border}`,
                borderRadius: rem(8),
                boxShadow: theme.shadows.sm,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Title order={4} mb="sm" style={{ color: textColor }}>
                Participants Countries
              </Title>
              <Text fw={700} style={{ color: textColor }}>
                Netherlands
              </Text>
              <Text fw={700} style={{ color: textColor }}>
                Spain
              </Text>
              <Text fw={700} style={{ color: textColor }}>
                Türkiye
              </Text>
            </Box>
          </Grid.Col>

          {/* Coordinator Info */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              p="md"
              style={{
                height: '100%',
                backgroundColor: background,
                border: `1px solid ${border}`,
                borderRadius: rem(8),
                boxShadow: theme.shadows.sm,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Title order={4} mb="sm" style={{ color: textColor }}>
                Coordinator
              </Title>
              <Text fw={700} style={{ color: textColor }}>
                CANKAYA UNIVERSITESI
              </Text>
              <Text style={{ color: textColor }}>
                OGRETMENLER CADDESI 14 BALGAT
              </Text>
              <Text style={{ color: textColor }}>06530 ANKARA</Text>
              <Text style={{ color: textColor }}>Ankara</Text>
              <Text style={{ color: textColor }}>
                🇹🇷 <strong>Türkiye</strong>
              </Text>

              <Text mt="sm" style={{ color: textColor }}>
                <strong>Coordinator Type:</strong> Higher education institution
                (tertiary level)
              </Text>
              <Text style={{ color: textColor }}>
                <strong>Website:</strong>{' '}
                <Anchor
                  href="https://www.cankaya.edu.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.colors[theme.primaryColor][5] }}
                >
                  https://www.cankaya.edu.tr
                </Anchor>
              </Text>
              <Text style={{ color: textColor }}>
                <strong>Phone:</strong> +903122331291
              </Text>
            </Box>
          </Grid.Col>
        </Grid>

        {/* Partners Section */}
        <Box py="sm" mt="lg">
          <Container size="lg">
            <Title order={3} mb="md" style={{ color: textColor }}>
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
              <Accordion.Item value="ufv">
                <Accordion.Control>
                  <Group>
                    <Text fw={600} size="md" style={{ color: textColor }}>
                      🎓 FUNDACION UNIVERSIDAD FRANCISCO DE VITORIA
                    </Text>
                    <Badge variant="light" color="red">
                      🇪🇸 Spain
                    </Badge>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel style={partnerPanelStyles('Spain')}>
                  <Text style={{ color: textColor }}>
                    CARRETERA M515 POZUELO-MAJADAHONDA KM 1,8 S/N<br />
                    28223 POZUELO DE ALARCON<br />
                    Comunidad de Madrid<br />
                    <strong>🇪🇸 Spain</strong>
                  </Text>
                  <Text mt="sm" style={{ color: textColor }}>
                    <strong>Partner Type:</strong>{' '}
                    <Badge color="blue" variant="filled" size="xs">
                      Higher education
                    </Badge>
                  </Text>
                  <Group mt="xs" gap="md" wrap="wrap">
                    <Text style={{ color: textColor }}>
                      <strong>Website:</strong>{' '}
                      <Anchor
                        href="https://www.ufv.es"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://www.ufv.es
                      </Anchor>
                    </Text>
                    <Text style={{ color: textColor }}>
                      <strong>Phone:</strong> +34 917091400
                    </Text>
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>

              {/* Netherlands */}
              <Accordion.Item value="partner2">
                <Accordion.Control>
                  <Group>
                    <Text fw={600} size="md" style={{ color: textColor }}>
                      🏫 OPEN UNIVERSITEIT
                    </Text>
                    <Badge variant="light" color="indigo">
                      🇳🇱 Netherlands
                    </Badge>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel style={partnerPanelStyles('Netherlands')}>
                  <Text style={{ color: textColor }}>
                    VALKENBURGERWEG 177<br />
                    6419 AT HEERLEN<br />
                    Limburg (NL)<br />
                    <strong>🇳🇱 Netherlands</strong>
                  </Text>
                  <Text mt="sm" style={{ color: textColor }}>
                    <strong>Partner Type:</strong>{' '}
                    <Badge color="blue" variant="filled" size="xs">
                      Higher education
                    </Badge>
                  </Text>
                  <Group mt="xs" gap="md" wrap="wrap">
                    <Text style={{ color: textColor }}>
                      <strong>Website:</strong>{' '}
                      <Anchor
                        href="https://www.ou.nl"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://www.ou.nl
                      </Anchor>
                    </Text>
                    <Text style={{ color: textColor }}>
                      <strong>Phone:</strong> +31 455762222
                    </Text>
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>

              {/* Türkiye */}
              <Accordion.Item value="partner3">
                <Accordion.Control>
                  <Group>
                    <Text fw={600} size="md" style={{ color: textColor }}>
                      🏛️ TED UNIVERSITESI
                    </Text>
                    <Badge variant="light" color="yellow">
                      🇹🇷 Türkiye
                    </Badge>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel style={partnerPanelStyles('Türkiye')}>
                  <Text style={{ color: textColor }}>
                    ZIYA GOKALP CADDESI 48<br />
                    06420 CANKAYA ANKARA<br />
                    <strong>🇹🇷 Türkiye</strong>
                  </Text>
                  <Text mt="sm" style={{ color: textColor }}>
                    <strong>Partner Type:</strong>{' '}
                    <Badge color="blue" variant="filled" size="xs">
                      Higher education
                    </Badge>
                  </Text>
                  <Group mt="xs" gap="md" wrap="wrap">
                    <Text style={{ color: textColor }}>
                      <strong>Website:</strong>{' '}
                      <Anchor
                        href="https://www.tedu.edu.tr"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://www.tedu.edu.tr
                      </Anchor>
                    </Text>
                    <Text style={{ color: textColor }}>
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

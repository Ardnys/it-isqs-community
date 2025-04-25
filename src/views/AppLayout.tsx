import { Anchor, Box, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import classes from '../components/HeaderTabs.module.css';

import {
  IconArticle,
  IconBook,
  IconHome,
  IconMessageCircle,
  IconPhone,
} from '@tabler/icons-react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

const mainLinks = [
  { link: '/', label: 'Home' },
  { link: '/materials', label: 'Materials' },
  { link: '/blogs', label: 'Blogs' },
  { link: '/forum', label: 'Forum' },
  { link: '/contact', label: 'Contact' },
];

export const AppLayout = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const navigate = useNavigate();

  const iconMap = {
    '/': <IconHome size={20} />,
    '/materials': <IconBook size={20} />,
    '/blogs': <IconArticle size={20} />,
    '/forum': <IconMessageCircle size={20} />,
    '/contact': <IconPhone size={20} />,
  };

  const mainItems = mainLinks.map((item) => (
    <Anchor<'a'>
      href={item.link}
      key={item.label}
      className={classes.mainLink}
      data-active={location.pathname === item.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        close();
        navigate(item.link);
      }}
    >
      <Group gap="sm">
        <Box style={{ color: 'inherit', display: 'flex' }}>
          {iconMap[item.link as keyof typeof iconMap]}
        </Box>
        {item.label}
      </Group>
    </Anchor>
  ));

  return (
    <Stack>
      <Header onBurgerClick={toggle} burgerOpened={opened} />

      <Box pos="relative">
        <Drawer
          opened={opened}
          onClose={close}
          position="top"
          withinPortal={false}
          withCloseButton={false}
          transitionProps={{ transition: 'slide-down', duration: 200 }}
          styles={{
            root: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 5,
              backgroundColor: '#ffffff',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px',
              width: '100%',
            },
            content: {
              padding: '16px 24px',
              maxHeight: 'fit-content',
            },
          }}
        >
          <Stack gap="md">{mainItems}</Stack>
        </Drawer>

        <Box>
          <Outlet />
        </Box>
      </Box>
    </Stack>
  );
};

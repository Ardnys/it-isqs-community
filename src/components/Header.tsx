import { useState } from 'react';
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from '@tabler/icons-react';
import cx from 'clsx';
import {
  Avatar,
  Burger,
  Button,
  Container,
  Group,
  Menu,
  Tabs,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderTabs.module.css';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../supabase/supabaseClient';
import { useStore } from '@nanostores/react';
import { $currUser } from '../global-state/user';

const tabs = ['Home', 'Materials', 'Blogs', 'Forum'];

export function Header() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = useStore($currUser);
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    const path = `/${tab.toLowerCase()}`;
    navigate(path);
  };

  const handleLogout = () => {
    supabaseClient.auth.signOut();
    $currUser.set(null);
  };
  const handleLogin = () => {
    navigate('/auth');
  };

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab} onClick={() => handleTabClick(tab)}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="lg">
        <Group justify="space-between">
          {/* Burger Menu */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

          {/* Tabs Section */}
          <Tabs
            defaultValue="Home"
            variant="outline"
            visibleFrom="sm"
            classNames={{
              root: classes.tabs,
              list: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>

          {user ? (
            // Menu for logged-in user
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group gap={7}>
                    <Avatar
                      //   src={user.image}
                      //   alt={user.name}
                      radius="xl"
                      size={20}
                    />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {user.name}
                    </Text>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconSettings size={16} stroke={1.5} />}
                >
                  Account settings
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconLogout size={16} stroke={1.5} />}
                  onClick={handleLogout}
                  color="red"
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            // Login button for logged-out users
            <Button onClick={handleLogin}>Login</Button>
          )}
        </Group>
      </Container>
    </div>
  );
}

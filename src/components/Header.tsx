import {
  ActionIcon,
  Anchor,
  Avatar,
  Button,
  Container,
  Group,
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import { useStore } from '@nanostores/react';
import {
  IconChevronDown,
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
} from '@tabler/icons-react';
import cx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { $currUser } from '../global-state/user';
import { supabaseClient } from '../supabase/supabaseClient';
import classes from './HeaderTabs.module.css';

const mainLinks = [
  { link: '/', label: 'Home' },
  { link: '/materials', label: 'Materials' },
  { link: '/blogs', label: 'Blogs' },
  { link: '/forum', label: 'Forum' },
];

export function Header() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = useStore($currUser);
  const navigate = useNavigate();
  const [theme, setTheme] = useState<string>('dark');
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  const handleLogout = () => {
    supabaseClient.auth.signOut();
    $currUser.set(null);
  };
  const handleLogin = () => {
    navigate('/auth');
  };

  const [active, setActive] = useState(0);
  const mainItems = mainLinks.map((item, index) => (
    <Anchor<'a'>
      href={item.link}
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
        navigate(item.link);
      }}
    >
      {item.label}
    </Anchor>
  ));

  const handleThemeToggle = () => {
    if (theme === 'dark') {
      setTheme('light');
      setColorScheme('light');
    } else {
      setTheme('dark');
      setColorScheme('dark');
    }
  };

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="lg">
        <Group justify="space-between">
          <Group gap={30} justify="flex-end" className={classes.mainLinks}>
            {mainItems}
          </Group>

          <Group>
            <ActionIcon
              variant="subtle"
              color={theme === 'dark' ? 'yellow' : 'blue'}
              onClick={() => handleThemeToggle()}
              title="toggle color scheme"
            >
              {theme === 'dark' ? (
                <IconSun style={{ width: 18, height: 18 }} />
              ) : (
                <IconMoon style={{ width: 18, height: 18 }} />
              )}
            </ActionIcon>

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
                        //   src={user.image} we can add profile image here if needed
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
        </Group>
      </Container>
    </div>
  );
}

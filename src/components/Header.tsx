import {
  ActionIcon,
  Anchor,
  Avatar,
  Burger,
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
import { $currUser, $registeredUser } from '../global-state/user';
import { openTypedModal } from '../mantine/modals/modals-utils';
import { supabaseClient } from '../supabase/supabaseClient';
import classes from './HeaderTabs.module.css';

const mainLinks = [
  { link: '/', label: 'Home' },
  { link: '/materials', label: 'Materials' },
  { link: '/blogs', label: 'Blogs' },
  { link: '/forum', label: 'Forum' },
  { link: '/contact', label: 'Contact' },
];
type HeaderProps = {
  onBurgerClick: () => void;
  burgerOpened: boolean;
};
export function Header({ onBurgerClick, burgerOpened }: HeaderProps) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [active, setActive] = useState(0);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const user = useStore($registeredUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    supabaseClient.auth.signOut();
    $currUser.set(null);
  };

  const handleLogin = () => {
    navigate('/auth');
  };

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

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="lg">
        <Group justify="space-between">
          {/* Burger Menu Button (Mobile view) */}
          <Burger
            lineSize={2}
            size="md"
            opened={burgerOpened}
            onClick={onBurgerClick}
            aria-label="Toggle navigation"
            display={{ base: 'flex', md: 'none' }}
            style={{ position: 'relative', top: 20 }} // THIS  "FIX" is for losers like me but it workss
          />

          {/* Regular Links for larger screens */}
          <Group
            gap={30}
            justify="flex-end"
            className={classes.mainLinks}
            display={{ base: 'none', md: 'flex' }}
          >
            {mainItems}
          </Group>

          <Group gap="xs">
            {/* Theme toggle button */}
            <ActionIcon
              variant="subtle"
              onClick={() => toggleColorScheme()}
              size="lg"
              aria-label="Toggle color scheme"
            >
              {dark ? <IconSun size="1.1rem" /> : <IconMoon size="1.1rem" />}
            </ActionIcon>

            {user ? (
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
                        src={user.pfp_url}
                        radius="xl"
                        size={20}
                        alt="Profile picture"
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
                    onClick={() => {
                      openTypedModal({
                        modal: 'settings',
                        title: 'Settings',
                        body: {
                          modalBody: '',
                        },
                      });
                    }}
                  >
                    Settings
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
              <Button onClick={handleLogin}>Login</Button>
            )}
          </Group>
        </Group>
      </Container>
    </div>
  );
}

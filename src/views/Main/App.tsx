// File: src/App.jsx
import { useState } from 'react';
import { Badge, Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { spotlight } from '@mantine/spotlight';
import { useStore } from '@nanostores/react';
import { $currUser } from '../../global-state/user';
import { openTypedModal } from '../../mantine/modals/modals-utils';
import { supabaseClient } from '../../supabase/supabaseClient';
import Home from './Pages/Home';
import Contact from './Pages/Contact';

function App() {
  const user = useStore($currUser);
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <Stack>
      <Paper p="xl">
        <Group justify="center" mb="xl">
          <Button onClick={() => setCurrentPage('home')}>Home</Button>
          <Button onClick={() => setCurrentPage('dashboard')}>Dashboard</Button>
          <Button onClick={() => setCurrentPage('contact')}>Contact</Button>
        </Group>

        {currentPage === 'home' && (
          <>
            <Stack align="center" mb="xl">
            <Title order={2}>🏠 Welcome to the Home Page!</Title>
            <Text c="dimmed" style={{ maxWidth: 600, textAlign: 'center' }}>
            Deez is the home page
              </Text>
            </Stack>
            <Home />
          </>
        )}

        {currentPage === 'contact' && <Contact />}

        {currentPage === 'dashboard' && (
          <Group mt="xl">
            <Paper withBorder shadow="lg" p="md" style={{ cursor: 'pointer' }} onClick={() => window.location.replace('https://supabase.com/')}>
              <Group>
                <img style={{ width: '100px' }} src="https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png" />
                <Text size="xl" c="dimmed">Built with supabase</Text>
              </Group>
            </Paper>

            <Stack>
              <Badge variant="light">{user?.id}</Badge>
              <Button onClick={() => supabaseClient.auth.signOut()}>logout</Button>
            </Stack>

            <Button onClick={() => spotlight.open()}>Open spotlight</Button>
            <Button onClick={() => notifications.show({ message: 'im a notif' })}>Push notification</Button>
            <Button onClick={() => openTypedModal({ modal: 'testName', title: 'test name modal', body: { modalBody: 'ojla' } })}>
              Open modal
            </Button>
          </Group>
        )}
      </Paper>
    </Stack>
  );
}

export default App;

import { Box, Group, Stack, Title } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';

export const AppLayout = () => {
  return (
    <Stack>
      <Group>
        <Header></Header>
      </Group>
      <Box flex={1}>
        <Outlet />
      </Box>
    </Stack>
  );
};

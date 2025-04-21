import { Box, Stack } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const AppLayout = () => {
  return (
    <Stack>
      <Header />
      <Box flex={1}>
        <Outlet />
      </Box>
    </Stack>
  );
};

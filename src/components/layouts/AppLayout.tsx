import { Anchor, Box, Group, Stack, Tabs, Title } from '@mantine/core';
import {
  IconMessageCircle,
  IconPhoto,
  IconSettings,
} from '@tabler/icons-react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import TabContent from '../PageContainer';

export const AppLayout = () => {
  const navigate = useNavigate();
  const { tabValue } = useParams(); // Get the current tab value from the URL

  return (
    <Stack>
      <Group></Group>
      <Box flex={1}>
        <Outlet /> {/* This will render the correct content based on the URL */}
      </Box>
    </Stack>
  );
};

import { AppShell, Button, Group, Stack, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const navigate = useNavigate();
  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group>
          <Stack>
            <Title order={1}>Le Blogs</Title>
            <Title order={4}>Learn what's new</Title>
          </Stack>
        </Group>
      </AppShell.Header>
      <AppShell.Main></AppShell.Main>
      <AppShell.Aside>
        {/* TODO: hide this if not proffessional ? idk how to do that nicely */}
        <Button
          onClick={() => {
            navigate('/blog-edit');
          }}
        >
          Add new post
        </Button>
      </AppShell.Aside>
    </AppShell>
  );
};

export default Blogs;

import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  rem,
  Alert,
  Loader,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCircleKey, IconAlertCircle } from '@tabler/icons-react';
import { supabaseClient } from '../supabase/supabaseClient';
import { useUser } from '../supabase/loader';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Authentication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const navigate = useNavigate();
  const { user } = useUser();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        setError(error.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Box mih="100dvh" w="100dvw" p="md">
      <Center h="100%">
        <Container size={620} w="100%" maw={440} px={0}>
          <Group align="baseline" pl="sm">
            <IconCircleKey size={24} />
            <Title order={2}>Login</Title>
          </Group>

          <Paper withBorder shadow="sm" p="lg" mt="xl" radius="md">
            {error && (
              <Alert
                icon={<IconAlertCircle size={18} />}
                title="Login Failed"
                color="red"
                mb="md"
                variant="filled"
              >
                {error}
              </Alert>
            )}

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="Email"
                placeholder="you@example.com"
                required
                {...form.getInputProps('email')}
                styles={{
                  input: {
                    fontSize: rem(16),
                  },
                }}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                {...form.getInputProps('password')}
                styles={{
                  input: {
                    fontSize: rem(16),
                  },
                }}
              />

              <Button
                fullWidth
                mt="xl"
                size="md"
                type="submit"
                disabled={loading}
              >
                {loading ? <Loader size="sm" color="white" /> : 'Login'}
              </Button>
            </form>
            <Center mt="md">
              <Text size="sm" ta="center">
                Don't have an account?{' '}
                <Anchor
                  component="button"
                  onClick={() => navigate('/signup')}
                  fw={500}
                >
                  Sign up
                </Anchor>
              </Text>
            </Center>
          </Paper>
        </Container>
      </Center>
    </Box>
  );
}

import {
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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCircleKey } from '@tabler/icons-react';
import { supabaseClient } from '../supabase/supabaseClient';
import { useUser } from '../supabase/loader';
import { Navigate } from 'react-router-dom';
import { openTypedModal } from '../mantine/modals/modals-utils';

export function AuthSignUp() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  // redirect if logged in
  const { user } = useUser();
  if (user) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Box h="100vh" w="100vw">
      <Center h="100vh" w="100%">
        <Container size={620} miw={440}>
          <Group align="baseline">
            <Text c="dimmed">
              <IconCircleKey></IconCircleKey>
            </Text>
            <Title>Sign Up</Title>
          </Group>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form
              onSubmit={form.onSubmit(async (values) => {
                const { error } = await supabaseClient.auth.signUp({
                  email: values.email,
                  password: values.password,
                });

                if (error) {
                  openTypedModal({
                    modal: 'testName',
                    title: 'Error',
                    body: {
                      modalBody: error.message, // Correctly pass the error message
                    },
                  });
                } else {
                  <Navigate to="/auth"></Navigate>; // Redirect to login if successful
                }
              })}
            >
              <TextInput
                label="Email"
                placeholder="you@mantine.dev"
                required
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                {...form.getInputProps('password')}
              />

              <Button fullWidth mt="xl" type="submit">
                Sign up
              </Button>
            </form>
          </Paper>
        </Container>
      </Center>
    </Box>
  );
}

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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCircleKey } from '@tabler/icons-react';
import { supabaseClient } from '../supabase/supabaseClient';
import { notifications } from '@mantine/notifications';

export function SignUp() {
  const form = useForm({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevents page reload

    try {
      if (!form.isValid()) {
        console.error('Form validation failed!');
        return;
      }

      const { name, surname, email, password } = form.values;

      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: { name, surname }, // Stores additional user info
        },
      });

      if (error) {
        console.error('Error signing up: ', error.message);
        return;
      }
      const { error: insertError } = await supabaseClient
        .from('RegisteredUser')
        .insert([{ email, name, surname }]);

      if (insertError) {
        console.error('Error inserting data: ', insertError.message);
        return;
      }

      console.log('User signed up and data inserted successfully!', data);
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
  };

  return (
    <Box h="100vh" w="100vw">
      <Center h="100vh" w="100%">
        <Container size={620} miw={440}>
          <Group align="center" justify="center">
            <Text c="dimmed">
              <IconCircleKey />
            </Text>
            <Title>Sign Up</Title>
          </Group>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={handleSubmit}>
              <TextInput
                label="Name"
                placeholder="name"
                required
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Surname"
                placeholder="surname"
                required
                {...form.getInputProps('surname')}
              />
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

              <Button
                fullWidth
                mt="xl"
                type="submit"
                onClick={() => {
                  notifications.show({
                    message:
                      'We sent an email for verification to your adress!',
                  });
                }}
              >
                Sign Up
              </Button>
            </form>
          </Paper>
        </Container>
      </Center>
    </Box>
  );
}
export default SignUp;

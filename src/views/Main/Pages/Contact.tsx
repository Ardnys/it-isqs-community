import { useState } from 'react';
import { Box, Button, Container, Stack, Text, TextInput, Textarea, Title } from '@mantine/core';

function Contact() {
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = () => {
    setFormSent(true);
  };

  return (
    <Box>
      <Container size="md" py="lg">
        <Stack gap="xl">
            <Title order={2} ta="center">
            Contact Us
            </Title>
            <Text ta="center" c="dimmed" style={{ maxWidth: 600, margin: '0 auto' }}>
            Deez contact us page
            </Text>

          <form style={{ maxWidth: 600, margin: '0 auto' }} onSubmit={e => e.preventDefault()}>
            <Stack gap="md">
              <TextInput label="Your Name" placeholder="John Doe" required radius="md" />
              <TextInput label="Your Email" placeholder="john@example.com" type="email" required radius="md" />
              <Textarea label="Message" placeholder="Type your message here..." minRows={4} required radius="md" />
              <Button fullWidth mt="sm" variant="filled" color="blue" radius="md" onClick={handleSubmit}>
                {formSent ? 'Message Sent' : 'Send Message'}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Container>
    </Box>
  );
}

export default Contact;

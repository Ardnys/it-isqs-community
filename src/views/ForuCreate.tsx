import {
  TextInput,
  Button,
  Stack,
  Container,
  Title,
  Paper,
  Notification,
} from '@mantine/core';

import { useState } from 'react';
import { supabaseClient } from '../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@nanostores/react';
import { $registeredUser } from '../global-state/user';
import TextEditor from '../components/TextEditor';

export default function ForuCreate() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const user = useStore($registeredUser);

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) {
      setErrorMessage('Title and body are required');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    if (!user) {
      setLoading(false);
      setErrorMessage('You must be logged in to create a post.');
      return;
    }

    const { error } = await supabaseClient.from('ForumPost').insert({
      title,
      body,
      user_id: user.id,
      votes: 0,
      creation_date: new Date().toISOString(),
    });

    setLoading(false);

    if (error) {
      setErrorMessage('Failed to create post. Please try again.');
      console.error(error);
    } else {
      navigate('/forum');
    }
  };

  return (
    <Container size="md" py="xl">
      <Paper shadow="xs" p="md" withBorder>
        <Title order={2} mb="md">
          Create a New Post
        </Title>

        <Stack>
          <TextInput
            label="Title"
            placeholder="Enter post title"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            required
          />

          <TextEditor setBody={setBody} />

          {errorMessage && (
            <Notification color="red" title="Error">
              {errorMessage}
            </Notification>
          )}

          <Button onClick={handleSubmit} loading={loading}>
            Submit Post
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

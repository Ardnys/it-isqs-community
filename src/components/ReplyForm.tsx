import { useState } from 'react';
import { Button, Stack } from '@mantine/core';
import { supabaseClient } from '../supabase/supabaseClient';

import { useStore } from '@nanostores/react';
import { $registeredUser } from '../global-state/user';
import TextEditor from './TextEditor';
import { notifications } from '@mantine/notifications';

type ReplyFormProps = {
  postId: number;
  parentCommentId?: number | null;
  onSuccess: () => void;
};
const isEditorEmpty = (html: string) => {
  const text = html.replace(/<[^>]+>/g, '').trim();
  return text.length === 0;
};
const ReplyForm = ({
  postId,
  parentCommentId = null,
  onSuccess,
}: ReplyFormProps) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useStore($registeredUser);

  const handleSubmit = async () => {
    setLoading(true);

    if (!user?.id) {
      notifications.show({
        title: 'You must be logged in for that!',
        message: 'Login to join the discussion!',
        color: 'red',
        autoClose: 3000,
      });
      setLoading(false);
      return;
    }

    if (!value.trim()) {
      setLoading(false);
      return;
    }

    const { error } = await supabaseClient.from('ForumReply').insert({
      post_id: postId,
      parent_comment_id: parentCommentId,
      user_id: user.id,
      body: value,
    });

    if (!error) {
      setValue('');
      onSuccess();
    } else {
      console.error('Reply failed:', error);
    }

    setLoading(false);
  };

  return (
    <Stack gap="xs">
      <TextEditor setBody={setValue} minHeight={150} />
      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={isEditorEmpty(value)}
      >
        Reply
      </Button>
    </Stack>
  );
};

export default ReplyForm;

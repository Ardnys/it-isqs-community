import { useState } from 'react';
import { Textarea, Button, Stack } from '@mantine/core';
import { supabaseClient } from '../supabase/supabaseClient';

import { useStore } from '@nanostores/react';
import { $registeredUser } from '../global-state/user';
import TextEditor from './TextEditor';

type ReplyFormProps = {
  postId: number;
  parentCommentId?: number | null;
  onSuccess: () => void;
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
    if (!value.trim()) return;
    setLoading(true);
    if (user?.id) {
      const { error } = await supabaseClient.from('ForumReply').insert({
        post_id: postId,
        parent_comment_id: parentCommentId,
        user_id: user?.id, // Replace with actual logged-in user ID
        body: value,
      });

      setLoading(false);
      if (!error) {
        setValue('');
        onSuccess();
      } else {
        console.error('Reply failed:', error);
      }
    }
  };

  return (
    <Stack gap="xs">
      <TextEditor setBody={setValue} />
      <Button onClick={handleSubmit} loading={loading}>
        Reply
      </Button>
    </Stack>
  );
};

export default ReplyForm;

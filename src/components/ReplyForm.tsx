import { useState } from 'react';
import { Textarea, Button, Stack } from '@mantine/core';
import { supabaseClient } from '../supabase/supabaseClient';

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

  const handleSubmit = async () => {
    if (!value.trim()) return;
    setLoading(true);
    const { error } = await supabaseClient.from('ForumReply').insert({
      post_id: postId,
      parent_comment_id: parentCommentId,
      user_id: 1, // Replace with actual logged-in user ID
      body: value,
    });
    setLoading(false);
    if (!error) {
      setValue('');
      onSuccess();
    } else {
      console.error('Reply failed:', error);
    }
  };

  return (
    <Stack gap="xs">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="Write your reply..."
        autosize
        minRows={2}
      />
      <Button onClick={handleSubmit} loading={loading}>
        Reply
      </Button>
    </Stack>
  );
};

export default ReplyForm;

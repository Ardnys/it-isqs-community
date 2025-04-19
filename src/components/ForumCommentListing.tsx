import { useEffect, useState } from 'react';
import { supabaseClient } from '../supabase/supabaseClient';
import { Title } from '@mantine/core';
import { Avatar, Paper, Text, Group, Stack } from '@mantine/core';
import Comment from './Comment';

type ForumReply = {
  id: number;
  user_id: number;
  post_id: number;
  parent_comment_id: number | null;
  body: string | null;
  date: string | null;
  RegisteredUser: {
    name: string;
    surname: string | null;
    pfp_url: string | null;
  } | null;
};

export type CommentNode = ForumReply & {
  user: {
    name: string;
    surname: string | null;
    pfp_url: string | null;
  };
  replies: CommentNode[];
};

function buildCommentTree(data: ForumReply[]): CommentNode[] {
  const allComments: Record<number, CommentNode> = {};
  const tree: CommentNode[] = [];

  data.forEach((comment) => {
    allComments[comment.id] = {
      ...comment,
      user: {
        name: comment.RegisteredUser?.name ?? 'Unknown',
        surname: comment.RegisteredUser?.surname ?? '',
        pfp_url: comment.RegisteredUser?.pfp_url ?? null,
      },
      replies: [],
    };
  });

  Object.values(allComments).forEach((comment) => {
    if (comment.parent_comment_id === null) {
      tree.push(comment);
    } else {
      const parent = allComments[comment.parent_comment_id];
      if (parent) parent.replies.push(comment);
    }
  });

  return tree;
}

const ForumCommentListing = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<CommentNode[]>([]);

  useEffect(() => {
    const fetchAllComments = async () => {
      const { data, error } = await supabaseClient
        .from('ForumReply')
        .select(
          `
          id,
          user_id,
          post_id,
          body,
          date,
          parent_comment_id,
          RegisteredUser:user_id (
            name,
            surname,
            pfp_url
          )
        `,
        )
        .eq('post_id', postId);

      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }

      if (data) {
        console.log(data);
        const tree = buildCommentTree(data);
        setComments(tree);
      }
    };

    fetchAllComments();
  }, [postId]);

  return (
    <Stack gap="md">
      <Title order={3}>Comments</Title>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
};

export default ForumCommentListing;

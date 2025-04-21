import { supabaseClient } from '../supabase/supabaseClient';

const handlePostVote = async (
  postId: number,
  upvote: boolean,
  userId: number,
  posts: ForumPost[] | null,
  setPosts: (a: ForumPost[] | null) => void,
) => {
  try {
    // Check if the user has already voted on this post
    const { data: existingVote, error: fetchError } = await supabaseClient
      .from('UserPostVotes')
      .select()
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // Ignore "No rows found" error (PGRST116), as it means the user hasn't voted yet
      console.error('Error fetching existing vote:', fetchError);
      return;
    }

    if (existingVote) {
      if (existingVote.upvote === upvote) {
        // If the vote is the same as the current action, delete their existing vote
        const { error } = await supabaseClient
          .from('UserPostVotes')
          .delete()
          .eq('id', existingVote.id);

        if (error) {
          console.error('Error while deleting vote: ', error);
          return;
        }
        // Update the local state to reflect the vote deletion
        const updatedPosts = posts?.map((post) => {
          if (post.id === postId) {
            return upvote
              ? { ...post, upvotes: post.upvotes - 1 }
              : { ...post, downvotes: post.downvotes - 1 };
          }
          return post;
        });
        setPosts(updatedPosts || null);
      } else {
        // If the user casts the other vote, update the existing vote
        const { error: updateError } = await supabaseClient
          .from('UserPostVotes')
          .update({ upvote })
          .eq('id', existingVote.id);

        if (updateError) {
          console.error('Error updating vote:', updateError);
          return;
        }
        // Update the local state to reflect different vote
        const updatedPosts = posts?.map((post) => {
          if (post.id === postId) {
            return upvote
              ? {
                  ...post,
                  upvotes: post.upvotes + 1,
                  downvotes: post.downvotes - 1,
                }
              : {
                  ...post,
                  upvotes: post.upvotes - 1,
                  downvotes: post.downvotes + 1,
                };
          }
          return post;
        });
        setPosts(updatedPosts || null);
      }
    } else {
      // If the user hasn't voted yet, insert a new vote
      const { error: insertError } = await supabaseClient
        .from('UserPostVotes')
        .insert({
          post_id: postId,
          user_id: userId,
          upvote,
        });

      if (insertError) {
        console.error('Error inserting vote:', insertError);
        return;
      }

      // Update the local state
      const updatedPosts = posts?.map((post) => {
        if (post.id === postId) {
          return upvote
            ? { ...post, upvotes: post.upvotes + 1 }
            : { ...post, downvotes: post.downvotes + 1 };
        }
        return post;
      });
      setPosts(updatedPosts || null);
    }
  } catch (error) {
    console.error('Unexpected error while handling vote:', error);
  }
};

export default handlePostVote;

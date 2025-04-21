import { supabaseClient } from '../supabase/supabaseClient';

export const fetchPostComments = async (id: number) => {
  const { count, error } = await supabaseClient
    .from('ForumReply')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', id);

  if (error) {
    console.error('Error while fetching number of replies: ', error.message);
    return 0;
  }
  return count;
};

export const fetchPostVotes = async (id: number) => {
  const { count: upvotes, error: uperror } = await supabaseClient
    .from('UserPostVotes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', id)
    .eq('upvote', true);

  if (uperror) {
    console.error('Failed to fetch vote count for post', id, uperror);
    return { upvotes: 0, downvotes: 0 };
  }

  const { count: downvotes, error: downerror } = await supabaseClient
    .from('UserPostVotes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', id)
    .eq('upvote', false);

  if (downerror) {
    console.error('Failed to fetch vote count for post', id, downerror);
    return { upvotes: 0, downvotes: 0 };
  }

  return { upvotes: upvotes || 0, downvotes: downvotes || 0 };
};

const handlePostVote = async (
  postId: number,
  upvote: boolean,
  userId: number,
  posts: ForumPost | ForumPost[] | null,
  setPosts: (value: ForumPost | ForumPost[] | null) => void,
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
        if (Array.isArray(posts)) {
          const updatedPosts = posts.map((post) => {
            if (post.id === postId) {
              return upvote
                ? { ...post, upvotes: post.upvotes - 1 }
                : { ...post, downvotes: post.downvotes - 1 };
            }
            return post;
          });
          setPosts(updatedPosts);
        } else if (posts && posts.id === postId) {
          const updatedPost = upvote
            ? { ...posts, upvotes: posts.upvotes - 1 }
            : { ...posts, downvotes: posts.downvotes - 1 };
          setPosts(updatedPost);
        }
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

        // Update the local state to reflect the different vote
        if (Array.isArray(posts)) {
          const updatedPosts = posts.map((post) => {
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
          setPosts(updatedPosts);
        } else if (posts && posts.id === postId) {
          const updatedPost = upvote
            ? {
                ...posts,
                upvotes: posts.upvotes + 1,
                downvotes: posts.downvotes - 1,
              }
            : {
                ...posts,
                upvotes: posts.upvotes - 1,
                downvotes: posts.downvotes + 1,
              };
          setPosts(updatedPost);
        }
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
      if (Array.isArray(posts)) {
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            return upvote
              ? { ...post, upvotes: post.upvotes + 1 }
              : { ...post, downvotes: post.downvotes + 1 };
          }
          return post;
        });
        setPosts(updatedPosts);
      } else if (posts && posts.id === postId) {
        const updatedPost = upvote
          ? { ...posts, upvotes: posts.upvotes + 1 }
          : { ...posts, downvotes: posts.downvotes + 1 };
        setPosts(updatedPost);
      }
    }
  } catch (error) {
    console.error('Unexpected error while handling vote:', error);
  }
};

export default handlePostVote;

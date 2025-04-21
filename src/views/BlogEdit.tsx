import '@mantine/tiptap/styles.css';

import {
  Badge,
  Box,
  Button,
  FileInput,
  Flex,
  Group,
  Image,
  MultiSelect,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { useStore } from '@nanostores/react';
import { IconX } from '@tabler/icons-react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { $registeredUser } from '../global-state/user';
import { supabaseClient } from '../supabase/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const BlogEdit = () => {
  const navigate = useNavigate();
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [professionals, setProfessionals] = useState<
    Array<{
      value: string;
      label: string;
    }>
  >([]);
  const currentUser = useStore($registeredUser);

  const [error, setError] = useState<string | null>(null);

  const [coAuthors, setCoAuthors] = useState<string[]>([]);

  // Fetch professionals from the database
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('RegisteredUser')
          .select('id, name,pfp_url')
          .eq('role', 'professional');

        if (error) {
          throw error;
        }

        if (data) {
          const professionalsData = data
            .filter((user) => user.id !== currentUser!.id)
            .map((user) => ({
              value: String(user.id),
              label: user.name,
            }));
          setProfessionals(professionalsData);
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to fetch professionals',
        );
        console.error('Error fetching professionals:', error);
      } finally {
      }
    };

    fetchProfessionals();
  }, []);

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: '<p style="text-align: center;">Write your blog post here</p>',
  });

  const form = useForm({
    initialValues: {
      title: '',
      thumbnail: null as File | null,
    },
    validate: {
      title: (value) =>
        value.trim().length === 0 ? 'Title is required' : null,
      thumbnail: (value) => (value ? null : 'Thumbnail is required'),
    },
  });

  const handleThumbnailChange = (file: File | null) => {
    form.setFieldValue('thumbnail', file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview(null);
    }
  };

  const saveBlogPost = async (blog: {
    title: string;
    thumbnail: File | null;
    blogContent: string;
  }) => {
    try {
      const fileExt = blog.thumbnail!.name.split('.').pop();
      const uniqueFileName = `${uuidv4()}.${fileExt}`;

      const { data: uploadData, error: uploadError } =
        await supabaseClient.storage
          .from('storage')
          .upload(`thumbnails/${uniqueFileName}`, blog.thumbnail!, {
            contentType: blog.thumbnail!.type,
          });

      if (uploadError) throw uploadError;

      // Insert blog post
      const { data, error } = await supabaseClient
        .from('Blog')
        .insert({
          title: blog.title,
          body: blog.blogContent,
          thumbnail: uniqueFileName,
          date: new Date().toISOString(),
        })
        .select();

      if (error) {
        console.error('Error inserting blog:', error);
        return;
      }

      const blogId = data?.[0]?.id;
      if (!blogId) {
        console.error('No blog ID returned');
        return;
      }

      // Co-author insert (including current user)
      const allCoAuthorIds = [
        Number(currentUser?.id), // current user ID
        ...coAuthors.map((authorId) => Number(authorId)), // Co-authors IDs
      ];

      const coAuthorInserts = allCoAuthorIds.map((authorId) => ({
        blog_id: blogId,
        author_id: authorId,
      }));
      console.log(coAuthorInserts);

      const { error: coAuthorError } = await supabaseClient
        .from('CoAuthors')
        .insert(coAuthorInserts);

      if (coAuthorError) {
        console.error('Error inserting co-authors:', coAuthorError);
      }

      navigate('/blogs');
    } catch (error) {
      console.error('Error while saving blog post:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to save blog post',
      );
    }
  };

  const handleSave = (values: { title: string; thumbnail: File | null }) => {
    const blogContent = editor?.getHTML() || '';

    saveBlogPost({
      title: values.title,
      thumbnail: values.thumbnail,
      blogContent,
    });
    navigate('/blogs');
  };

  return (
    <div style={{ width: '100vw', paddingLeft: '20vw', paddingRight: '20vw' }}>
      <form onSubmit={form.onSubmit(handleSave)}>
        <Stack>
          <TextInput
            label="Title"
            placeholder="Title of your blog post"
            required
            {...form.getInputProps('title')}
          />
          <MultiSelect
            label="Choose Co-Authors"
            placeholder="Pick Professional"
            data={professionals}
            value={coAuthors}
            onChange={setCoAuthors}
            clearable
          />

          <FileInput
            label="Upload Thumbnail"
            accept="image/jpeg,image/png"
            placeholder="Select an image"
            required
            onChange={handleThumbnailChange}
            error={form.errors.thumbnail}
          />
          {thumbnailPreview && (
            <Image
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              radius="md"
              fit="cover"
              style={{ width: 400, height: 200 }}
            />
          )}

          <RichTextEditor editor={editor} title="Blog Body">
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
          </RichTextEditor>
        </Stack>

        <Group mt="md">
          <Button variant="outline" onClick={() => navigate('/blogs')}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </Group>

        {error && (
          <div style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</div>
        )}
      </form>
    </div>
  );
};

export default BlogEdit;

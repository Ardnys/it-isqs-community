import '@mantine/tiptap/styles.css';

import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Button,
  Group,
  Stack,
  TextInput,
  FileInput,
  Image,
  Select,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { supabaseClient } from '../supabase/supabaseClient';

const BlogEdit = () => {
  const navigate = useNavigate();
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [professionals, setProfessionals] = useState<
    Array<{
      value: string;
      label: string;
      avatar: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<
    string | null
  >(null);

  // Fetch professionals from the database
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabaseClient
          .from('RegisteredUser')
          .select('id, name,pfp_url')
          .eq('role', 'professional');

        if (error) {
          throw error;
        }

        if (data) {
          const professionalsData = data.map((user) => ({
            value: String(user.id),
            label: user.name,
            avatar: user.pfp_url || '', // maybe we can add the avatar next to name
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
        setLoading(false);
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
      professionalId: '',
    },
    validate: {
      title: (value) =>
        value.trim().length === 0 ? 'Title is required' : null,
      thumbnail: (value) => (value ? null : 'Thumbnail is required'),
      professionalId: (value) => (value ? null : 'Add co-authors'),
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
    professionalId: string;
  }) => {
    try {
      // Upload thumbnail
      const { data: uploadData, error: uploadError } =
        await supabaseClient.storage
          .from('storage')
          .upload(
            `thumbnails/${blog.thumbnail?.name as string}`,
            blog.thumbnail as File,
            {
              contentType: 'image/jpeg',
            },
          );

      if (uploadError) {
        throw uploadError;
      }

      // Save blog post to database
      const { error } = await supabaseClient.from('Blog').insert({
        title: blog.title,
        body: blog.blogContent,
        thumbnail: blog.thumbnail?.name,
        professional_id: blog.professionalId,
      });

      if (error) {
        throw error;
      }

      navigate('/blogs'); // Redirect after successful save
    } catch (error) {
      console.error('Error while saving blog post:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to save blog post',
      );
    }
  };

  const handleSave = (values: {
    title: string;
    thumbnail: File | null;
    professionalId: string;
  }) => {
    const blogContent = editor?.getHTML() as string;
    saveBlogPost({
      title: values.title,
      thumbnail: values.thumbnail,
      blogContent: blogContent,
      professionalId: values.professionalId,
    });
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

          <Select
            label="Add Co-Authors"
            placeholder="Choose a professional"
            data={professionals}
            searchable
            clearable
            nothingFoundMessage="No professionals found"
            disabled={loading}
            error={form.errors.professionalId}
            {...form.getInputProps('professionalId')}
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
          <Button type="submit" loading={loading}>
            Save
          </Button>
        </Group>

        {error && (
          <div style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</div>
        )}
      </form>
    </div>
  );
};

export default BlogEdit;

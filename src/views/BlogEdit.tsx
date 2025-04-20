import '@mantine/tiptap/styles.css';

import {
  Badge,
  Box,
  Button,
  FileInput,
  Flex,
  Group,
  Image,
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
  const user = useStore($registeredUser);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<
    string | null
  >(null);
  const [coAuthors, setCoAuthors] = useState<
    Array<{ value: string; label: string }>
  >([]);

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

  const handleAddCoAuthor = () => {
    if (!selectedProfessional) return;

    const prof = professionals.find((p) => p.value === selectedProfessional);
    if (!prof) return;

    const alreadyAdded = coAuthors.some((ca) => ca.value === prof.value);
    if (!alreadyAdded) {
      setCoAuthors((prev) => [...prev, prof]);
    }

    setSelectedProfessional(null); // clear select
  };
  // Handle removing co-author
  const handleRemoveCoAuthor = (value: string) => {
    setCoAuthors((prev) => prev.filter((author) => author.value !== value));
  };

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
      // Upload thumbnail
      const { data: uploadData, error: uploadError } =
        await supabaseClient.storage
          .from('storage')
          .upload(`thumbnails/${blog.thumbnail?.name}`, blog.thumbnail!, {
            contentType: 'image/jpeg',
          });

      if (uploadError) throw uploadError;

      // Insert blog post
      const { data, error } = await supabaseClient
        .from('Blog')
        .insert({
          title: blog.title,
          body: blog.blogContent,
          thumbnail: blog.thumbnail?.name,
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
        Number(user?.id),
        ...coAuthors.map((author) => Number(author.value)),
      ];

      const coAuthorInserts = allCoAuthorIds.map((authorId) => ({
        blog_id: blogId,
        author_id: authorId,
      }));

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

          <Flex align="flex-end" gap="sm">
            <Box style={{ flex: 1 }}>
              <Select
                label="Add Co-Authors"
                placeholder="Choose a professional"
                data={professionals}
                value={selectedProfessional}
                onChange={setSelectedProfessional}
                searchable
                clearable
                nothingFoundMessage="No professionals found"
                disabled={loading}
                w="100%"
              />
            </Box>

            <Button
              onClick={handleAddCoAuthor}
              disabled={!selectedProfessional}
            >
              Add
            </Button>
          </Flex>
          <Stack mt="xs">
            {coAuthors.map((author) => (
              <Badge
                key={author.value}
                variant="light"
                size="lg"
                rightSection={
                  <Button
                    variant="subtle"
                    size="m"
                    onClick={() => handleRemoveCoAuthor(author.value)}
                    p={0}
                  >
                    <IconX size={14} /> {/* IconX as the remove button */}
                  </Button>
                }
              >
                {author.label}
              </Badge>
            ))}
          </Stack>

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

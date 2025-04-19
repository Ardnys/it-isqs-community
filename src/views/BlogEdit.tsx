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
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { supabaseClient } from '../supabase/supabaseClient';

const BlogEdit = () => {
  const navigate = useNavigate();
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: '<h2 style="text-align: center;">Write your blog post here</h2>',
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
    {
      const { data, error } = await supabaseClient.storage
        .from('storage')
        .upload(
          `thumbnails/${blog.thumbnail?.name as string}`,
          blog.thumbnail as File,
          {
            contentType: 'image/jpeg',
          },
        );
      if (error) {
        console.error('Error while uploading file', error);
      }
    }

    const { error } = await supabaseClient.from('Blog').insert({
      title: blog.title,
      body: blog.blogContent,
      thumbnail: blog.thumbnail?.name,
    });
    if (error) {
      console.error('error while saving to db: ', error);
    }
  };

  const handleSave = (values: { title: string; thumbnail: File | null }) => {
    const blogContent = editor?.getHTML() as string;
    console.log('Blog title:', values.title);
    console.log('Blog content saved:', blogContent);
    console.log('Thumbnail file:', values.thumbnail);
    saveBlogPost({
      title: values.title,
      thumbnail: values.thumbnail,
      blogContent: blogContent,
    });
    navigate('/blogs'); // Redirect back to the blogs page after saving
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
              // width={50}
              // height={50}
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
      </form>
    </div>
  );
};

export default BlogEdit;

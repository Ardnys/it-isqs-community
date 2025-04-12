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

  const handleSave = (values: { title: string; thumbnail: File | null }) => {
    // TODO: Replace this with an API call to save the blog post
    console.log('Blog content saved:', editor?.getHTML());
    console.log('Blog title:', values.title);
    console.log('Thumbnail file:', values.thumbnail);
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
              style={{ width: '50', height: 'auto' }}
              radius="md"
              width="50"
              height="50"
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

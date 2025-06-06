import '@mantine/tiptap/styles.css';

import {
  Button,
  Container,
  FileInput,
  Group,
  Image,
  MultiSelect,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useStore } from '@nanostores/react';
import { IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { $registeredUser } from '../global-state/user';
import { supabaseClient } from '../supabase/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { notifications } from '@mantine/notifications';
import TextEditor from '../components/TextEditor';

const BlogEdit = () => {
  const navigate = useNavigate();
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [professionals, setProfessionals] = useState<
    Array<{
      value: string;
      label: string;
    }>
  >([]);
  const [body, setBody] = useState('');
  const currentUser = useStore($registeredUser);

  const [coAuthors, setCoAuthors] = useState<string[]>([]);
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('RegisteredUser')
          .select('id, name,pfp_url')
          .eq('role', 'professional');

        if (error) {
          console.error('Error: ', error);
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
        notifications.show({
          title: 'Error while fetching professionals',
          message: error instanceof Error ? error.message : String(error),
          color: 'red',
          icon: <IconX size={16} />,
          autoClose: 4000,
          position: 'top-center',
        });
      }
    };

    fetchProfessionals();
  }, []);

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

      if (uploadError) {
        notifications.show({
          title: 'Error uploading thumbnail',
          message:
            uploadError instanceof Error
              ? uploadError.message
              : String(uploadData),
          color: 'red',
          icon: <IconX size={16} />,
          autoClose: 4000,
          position: 'top-center',
        });
      }

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
        notifications.show({
          title: 'Error inserting blog',
          message: error instanceof Error ? error.message : String(error),
          color: 'red',
          icon: <IconX size={16} />,
          autoClose: 4000,
          position: 'top-center',
        });

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
      notifications.show({
        title: 'Error while saving blog post',
        message: error instanceof Error ? error.message : String(error),
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 4000,
        position: 'top-center',
      });
    }
  };

  const handleSave = (values: { title: string; thumbnail: File | null }) => {
    const blogContent = body;

    saveBlogPost({
      title: values.title,
      thumbnail: values.thumbnail,
      blogContent,
    });
    navigate('/blogs');
  };

  return (
    <Container size="lg" py="lg">
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

          {/* TODO make this a component like TextEditor */}
          <TextEditor setBody={setBody} minHeight={300} />
        </Stack>

        <Group mt="md">
          <Button variant="outline" onClick={() => navigate('/blogs')}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Container>
  );
};

export default BlogEdit;

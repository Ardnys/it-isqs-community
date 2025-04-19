import {
  Badge,
  Button,
  FileInput,
  Stack,
  Image,
  Group,
  Avatar,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ContextModalProps } from '@mantine/modals';
import { useState, useEffect } from 'react';
import { supabaseClient } from '../../supabase/supabaseClient';
import { useStore } from '@nanostores/react';

import { $currUser, ExtendedUser } from '../../global-state/user';

export const Settings = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => {
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const currentUser = useStore($currUser);

  // Load current profile picture on component mount
  useEffect(() => {
    if (currentUser?.user_metadata?.profile_picture) {
      setThumbnailPreview(currentUser.user_metadata.profile_picture);
    }
  }, [currentUser]);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);

    if (newFile && newFile.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(newFile);
    } else {
      setThumbnailPreview(currentUser?.user_metadata?.profile_picture || null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const { data, error } = await supabaseClient.storage
        .from('storage')
        .upload(`profile-pictures/${file.name}`, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) throw error;

      const { data: publicData } = supabaseClient.storage
        .from('storage')
        .getPublicUrl(data?.path ?? '');

      //update the pfp in the metadata
      const { error: updateError } = await supabaseClient.auth.updateUser({
        data: { profile_picture: publicData.publicUrl },
      });

      if (updateError) throw updateError;

      notifications.show({
        title: 'Success!',
        message: 'Profile picture updated successfully',
        color: 'teal',
        autoClose: 3000,
      });

      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      if (user) {
        const extendedUser: ExtendedUser = {
          ...user,
          name: user.user_metadata?.name || '',
          surname: user.user_metadata?.surname || '',
        };
        $currUser.set(extendedUser);
        setThumbnailPreview(publicData.publicUrl); // Update preview with new image
      }
    } catch (error) {
      notifications.show({
        title: 'Upload failed',
        message: 'Could not update profile picture',
        color: 'red',
        autoClose: 3000,
      });
      // Revert to current profile picture on error
      setThumbnailPreview(currentUser?.user_metadata?.profile_picture || null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Stack>
      {innerProps.modalBody}

      <FileInput
        label="Upload File"
        accept="image/jpeg,image/png,image/webp"
        placeholder="Select an image file"
        required
        onChange={handleFileChange}
      />

      <Group align="center">
        {thumbnailPreview ? (
          <Image
            src={thumbnailPreview}
            alt="Profile picture preview"
            width={150}
            height={150}
            radius="md"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <Avatar src={null} radius="xl" size={150}>
            {currentUser?.email?.charAt(0).toUpperCase()}
          </Avatar>
        )}
      </Group>

      <Button
        onClick={handleUpload}
        loading={isUploading}
        disabled={!file || isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload File'}
      </Button>
    </Stack>
  );
};

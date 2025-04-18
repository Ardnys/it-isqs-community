import { Badge, Button, FileInput, Stack, Image, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ContextModalProps } from '@mantine/modals';
import { useState } from 'react';
import { supabaseClient } from '../../supabase/supabaseClient';
import { $currUser, ExtendedUser } from '../../global-state/user';

export const Settings = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => {
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);

    if (newFile && newFile.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(newFile);
    } else {
      setThumbnailPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      // Upload the file
      const { data, error } = await supabaseClient.storage
        .from('storage')
        .upload(`profile-pictures/${file.name}`, file, {
          cacheControl: '3600',
          upsert: true, // Allow overwriting
        });

      if (error) throw error;

      // Get public URL
      const { data: publicData } = supabaseClient.storage
        .from('storage')
        .getPublicUrl(data?.path ?? '');

      // Update user metadata with the new profile picture URL
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

      // Refresh user data
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
      }
    } catch (error) {
      notifications.show({
        title: 'Upload failed',
        message: 'Could not update profile picture',
        color: 'red',
        autoClose: 3000,
      });
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
        {thumbnailPreview && (
          <Image
            src={thumbnailPreview}
            alt="Thumbnail Preview"
            width={150}
            height={150}
            radius="md"
            style={{ objectFit: 'cover' }}
          />
        )}
        {file && !thumbnailPreview && (
          <Badge variant="outline" color="blue">
            {file.name}
          </Badge>
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

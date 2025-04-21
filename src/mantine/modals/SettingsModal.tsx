import { Button, FileInput, Stack, Image, Group, Avatar } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ContextModalProps } from '@mantine/modals';
import { useState, useEffect } from 'react';
import { supabaseClient } from '../../supabase/supabaseClient';
import { useStore } from '@nanostores/react';

import { $registeredUser } from '../../global-state/user';

export const Settings = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => {
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const currentUser = useStore($registeredUser);

  // Load current profile picture on component mount
  useEffect(() => {
    if (currentUser?.pfp_url) {
      setThumbnailPreview(currentUser.pfp_url);
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
      setThumbnailPreview(currentUser?.pfp_url || null);
    }
  };
  const updateProfilePicture = async (file: File, userEmail: string) => {
    try {
      // 1. Upload the file to storage
      const { data: uploadData, error: uploadError } =
        await supabaseClient.storage
          .from('storage')
          .upload(`profile-pictures/${file.name}`, file, {
            cacheControl: '3600',
            upsert: true,
          });

      if (uploadError) throw uploadError;

      // 2. Get public URL of the uploaded file
      const { data: publicData } = supabaseClient.storage
        .from('storage')
        .getPublicUrl(uploadData.path);

      const profilePictureUrl = publicData.publicUrl;

      $registeredUser.set({
        pfp_url: profilePictureUrl,
        id: currentUser?.id || 0,
        name: currentUser?.name || '',
        surname: currentUser?.name || '',
        email: currentUser?.email || '',
        role: '',
      });

      // 3. Update RegisteredUser table
      const { error: dbUpdateError } = await supabaseClient
        .from('RegisteredUser')
        .update({ pfp_url: profilePictureUrl })
        .eq('email', userEmail);

      if (dbUpdateError) throw dbUpdateError;

      setThumbnailPreview(publicData.publicUrl); // Update preview with new image
      return { success: true, url: profilePictureUrl };
    } catch (error) {
      console.error('Error updating profile picture:', error);
      return { success: false, error };
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      await updateProfilePicture(file, currentUser?.email!);

      notifications.show({
        title: 'Success!',
        message: 'Profile picture updated successfully',
        color: 'teal',
        autoClose: 3000,
      });
    } catch (error) {
      notifications.show({
        title: 'Upload failed',
        message: 'Could not update profile picture',
        color: 'red',
        autoClose: 3000,
      });
      // Revert to current profile picture on error
      setThumbnailPreview(currentUser?.pfp_url || null);
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

import { Badge, Button, FileInput, Stack } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useState } from 'react';

import { supabaseClient } from '../../supabase/supabaseClient';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

export const Upload = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const { data, error } = await supabaseClient.storage
          .from('storage')
          .upload(`materials/${file.name}`, file);

        if (error) {
          throw error;
        }
        notifications.show({
          title: 'Success',
          message: 'Material uploaded successfully',
          color: 'teal',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });

        context.closeModal(id);
        console.log('File uploaded successfully!', data);
      } catch (error: any) {
        notifications.show({
          title: 'Error while uploading material',
          message: error.message,
          color: 'red',
          icon: <IconX size={16} />,
          autoClose: 4000,
        });
      }
    }
  };

  return (
    <Stack style={{ position: 'relative' }}>
      {innerProps.modalBody}

      <FileInput
        label="Upload file"
        placeholder="Choose a file"
        onChange={handleFileChange}
      />

      {file && <Badge>{file.name}</Badge>}

      <Button onClick={handleUpload}>Upload File</Button>
    </Stack>
  );
};
//comment

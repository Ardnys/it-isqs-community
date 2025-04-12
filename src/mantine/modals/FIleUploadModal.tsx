import { Badge, Button, FileInput, Stack } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useState } from 'react';

import { supabaseClient } from '../../supabase/supabaseClient';

export const Upload = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile); // Set the selected file
  };

  const handleUpload = async () => {
    if (file) {
      try {
        // Upload file to Supabase
        const { data, error } = await supabaseClient.storage
          .from('storage') // Your bucket name
          .upload(`materials/${file.name}`, file);

        if (error) {
          throw error;
        }

        // Get public URL for the file
        const { data: publicData } = supabaseClient.storage
          .from('storage')
          .getPublicUrl(data?.path ?? '');

        setFileUrl(publicData.publicUrl); // Set the URL to state
        console.log('File uploaded successfully!', data);

        // Optionally, store file name and URL in Supabase database (e.g., 'materials' table)
        // await supabaseClient
        //   .from('materials')
        //   .insert([{ name: file.name, url: publicData.publicUrl }]);
      } catch (error) {
        console.error('Error uploading file:', error);
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

      <Button
        style={{ position: 'absolute', top: 10, right: 10 }}
        onClick={() => context.closeModal(id)}
      >
        Close
      </Button>
      <Button onClick={handleUpload}>Upload File</Button>
    </Stack>
  );
};

import { Badge, Button, FileInput, Stack, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useState } from 'react';

import { supabaseClient } from '../../supabase/supabaseClient';

export const Upload = ({
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => {
  const [file, setFile] = useState<File | null>(null);
  const [customFileName, setCustomFileName] = useState('');

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const fileExtension = file.name.split('.').pop();
        const fileName = customFileName
          ? `${customFileName}.${fileExtension}`
          : file.name;

        const { data, error } = await supabaseClient.storage
          .from('storage')
          .upload(`materials/${fileName}`, file);

        if (error) {
          throw error;
        }

        console.log('File uploaded successfully!', data);
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

      {file && (
        <>
          <Badge>{file.name}</Badge>
          <TextInput
            label="Custom file name"
            placeholder="Enter a custom file name (without extension)"
            value={customFileName}
            onChange={(event) => setCustomFileName(event.currentTarget.value)}
          />
        </>
      )}

      <Button onClick={handleUpload}>Upload File</Button>
    </Stack>
  );
};

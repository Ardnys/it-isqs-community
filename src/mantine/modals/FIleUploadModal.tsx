import {
  Badge,
  Button,
  FileInput,
  Stack,
  TextInput,
  Title,
  Group,
} from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useState } from 'react';
import { motion } from 'framer-motion';

import { supabaseClient } from '../../supabase/supabaseClient';

const MotionIcon = motion.svg;

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
      <Group>
        <Title order={2}>Materials</Title>
        <MotionIcon
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </MotionIcon>
      </Group>

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

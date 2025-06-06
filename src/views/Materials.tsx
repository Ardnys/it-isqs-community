import { Button, Card, Container, Grid, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { openTypedModal } from '../mantine/modals/modals-utils';
import { supabaseClient } from '../supabase/supabaseClient';

import handleDownload from '../Utils/DownloadHandler';
import { useStore } from '@nanostores/react';
import { $registeredUser } from '../global-state/user';
import { motion } from 'framer-motion';

const Materials = () => {
  const [files, setFiles] = useState<
    { name: string; url: string; path: string }[]
  >([]);
  const user = useStore($registeredUser);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabaseClient.storage
        .from('storage')
        .list('materials', { limit: 100 });

      if (error) throw error;

      const fileUrls =
        data?.map((file) => ({
          name: file.name,
          url: supabaseClient.storage
            .from('storage')
            .getPublicUrl(`materials/${file.name}`).data.publicUrl,
          path: `materials/${file.name}`,
        })) || [];

      setFiles(fileUrls);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const getIconForFile = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'ppt':
      case 'pptx':
        return '📽️';
      case 'txt':
        return '📃';
      case 'zip':
      case 'rar':
        return '🗜️';
      case 'mp3':
      case 'wav':
      case 'ogg':
      case 'flac':
        return '🎵';
      default:
        return '📁';
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <Container size="lg" py="lg" px="md">
      {/* Upload Button for Professionals */}
      {user?.role === 'professional' ? (
        <div
          style={{
            display: 'inline-block',
            width: '100%',
            position: 'relative',
            overflow: 'hidden', // Mask content to grow from the center
          }}
        >
          <Button
            onClick={() =>
              openTypedModal({
                modal: 'upload',
                title: 'Upload Material',
                body: { modalBody: 'Upload your material here' },
              })
            }
            fullWidth
            color="teal"
            style={{ marginBottom: '20px' }}
          >
            Upload
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 10,
                restDelta: 0.1,
              }}
              style={{
                fontSize: '36px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              📁
            </motion.div>
          </div>

          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontSize: '32px',
              fontWeight: 600,
              margin: 0,
            }}
          >
            Materials
          </motion.h1>
        </div>
      )}

      {/* Materials List */}
      <Grid gutter="lg" justify="flex-start" align="flex-start">
        {files.map((file, index) => (
          <Grid.Col
            key={index}
            span={{
              xs: 12, // Full width on extra-small screens
              sm: 6, // 2 columns on small screens
              md: 4, // 3 columns on medium screens
              lg: 3, // 4 columns on large and up
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                shadow="sm"
                padding={0}
                radius="md"
                style={{ width: '100%' }}
              >
                {['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(
                  file.name.split('.').pop()?.toLowerCase() || '',
                ) ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    style={{
                      width: '100%',
                      height: 180,
                      objectFit: 'cover',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: 180,
                      backgroundColor: '#f1f3f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 64,
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                    }}
                  >
                    {getIconForFile(file.name)}
                  </div>
                )}

                <Stack p="lg">
                  <Text fw={500} truncate="end">
                    {file.name}
                  </Text>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ width: '100%' }}
                  >
                    <Button
                      component="a"
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      color="teal"
                      fullWidth
                    >
                      View
                    </Button>
                  </motion.div>

                  {user && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ width: '100%' }}
                    >
                      <Button
                        onClick={() => handleDownload(file.path, file.name)}
                        variant="filled"
                        color="teal"
                        fullWidth
                      >
                        Download
                      </Button>
                    </motion.div>
                  )}
                </Stack>
              </Card>
            </motion.div>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Materials;

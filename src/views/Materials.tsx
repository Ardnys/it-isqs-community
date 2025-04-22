import { Button, Card, Container, Grid, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { openTypedModal } from '../mantine/modals/modals-utils';
import { supabaseClient } from '../supabase/supabaseClient';

import handleDownload from '../Utils/DownloadHandler';
import { useStore } from '@nanostores/react';
import { $currUser } from '../global-state/user';
import { motion } from 'framer-motion';

const Materials = () => {
  const [files, setFiles] = useState<
    { name: string; url: string; path: string }[]
  >([]);
  const user = useStore($currUser);
  const [role, setRole] = useState<'registered' | 'professional' | null>(null);

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

  const fetchRole = async () => {
    if (!user?.email) return;

    try {
      const { data, error } = await supabaseClient
        .from('RegisteredUser')
        .select('role')
        .eq('email', user.email)
        .single();

      if (error) {
        console.error('Error fetching role:', error);
        setRole(null);
        return;
      }

      setRole(
        data?.role === 'registered' || data?.role === 'professional'
          ? data.role
          : null,
      );
    } catch (error) {
      console.error('Error fetching role:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    fetchRole();
  }, [user?.email]);

  return (
    <Container size="lg" py="lg">
      {/* Upload Button for Professionals */}
      {role === 'professional' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
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
            size="lg"
            style={{ marginBottom: '20px' }}
          >
            Upload
          </Button>
        </motion.div>
      )}

      {/* Materials List */}
      <Grid gutter="lg" justify="flex-start" align="flex-start">
        {files.map((file, index) => (
          <Grid.Col span={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                style={{ width: '100%' }}
              >
                <Stack>
                  <Text>{file.name}</Text>

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

                  {/* Download Button (only for logged in users) */}
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

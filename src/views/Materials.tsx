// Materials.tsx
import {
  Button,
  Card,
  Container,
  Grid,
  List,
  Stack,
  Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { openTypedModal } from '../mantine/modals/modals-utils';
import { supabaseClient } from '../supabase/supabaseClient';
import { useUser } from '../supabase/loader';

import handleDownload from '../Utils/DownloadHandler';
import { useStore } from '@nanostores/react';
import { $currUser } from '../global-state/user';

const Materials = () => {
  const [files, setFiles] = useState<
    { name: string; url: string; path: string }[]
  >([]);

  const user = useStore($currUser);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabaseClient.storage
        .from('storage')
        .list('materials', {
          limit: 100,
        });

      if (error) {
        throw error;
      }

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
  useEffect(() => {
    fetchFiles();
  }, []);

  const [role, setRole] = useState<'registered' | 'professional' | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) return;
      console.log(user.email);

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

      if (data?.role === 'registered' || data?.role === 'professional') {
        setRole(data.role);
      } else {
        setRole(null);
      }
    };

    fetchRole();
  }, [user?.email]);

  return (
    <Container size="lg" py="lg">
      {role === 'professional' && (
        <Button
          onClick={() => {
            openTypedModal({
              modal: 'upload',
              title: 'Upload Material',
              body: {
                modalBody: 'Upload your material here',
              },
            });
          }}
          fullWidth
          color="teal"
          size="lg"
          style={{ marginBottom: '20px' }}
        >
          Upload
        </Button>
      )}

      <Grid gutter="lg" justify="flex-start" align="flex-start">
        {files.map((file, index) => (
          <Grid.Col span={3} key={index}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              style={{ width: '100%' }}
            >
              <Stack>
                <Text>{file.name}</Text>
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
                {user && (
                  <Button
                    onClick={() => handleDownload(file.path, file.name)}
                    variant="filled"
                    color="teal"
                    fullWidth
                  >
                    Download
                  </Button>
                )}
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Materials;

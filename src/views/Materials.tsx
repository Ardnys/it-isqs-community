// Materials.tsx
import { Button, Card, Grid, List, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { openTypedModal } from '../mantine/modals/modals-utils';
import { supabaseClient } from '../supabase/supabaseClient';
import { useUser } from '../supabase/loader';
import { getUserRole } from '../Utils/RoleChecker';

const Materials = () => {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const { user } = useUser();

  const fetchFiles = async () => {
    try {
      // List files in the "materials" folder of the "storage" bucket
      const { data, error } = await supabaseClient.storage
        .from('storage') // Your bucket name
        .list('materials', {
          limit: 100,
        });

      if (error) {
        throw error;
      }
      // Get public URLs for each file
      const fileUrls =
        data?.map((file) => ({
          name: file.name,
          url: supabaseClient.storage
            .from('storage')
            .getPublicUrl(`materials/${file.name}`).data.publicUrl, // Get the public URL for each file
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
      if (user?.email) {
        const r = await getUserRole(user.email);
        setRole(r);
      }
    };
    fetchRole();
  }, [user]);
  console.log('role is' + role);

  return (
    <div>
      {role === 'professional' && (
        <Button
          onClick={() => {
            openTypedModal({
              modal: 'testName',
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
                <Text>{file.name}</Text> {/* Display the file name */}
                <Button
                  component="a"
                  href={file.url}
                  download
                  variant="outline"
                  color="teal"
                  fullWidth
                >
                  View
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default Materials;

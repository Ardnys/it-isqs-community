// Materials.tsx
import { Button, Card, Grid, List, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { openTypedModal } from '../mantine/modals/modals-utils';
import { supabaseClient } from '../supabase/supabaseClient';
import { useUser } from '../supabase/loader';
import { getUserRole } from '../Utils/RoleChecker';

const Materials = () => {
  const [files, setFiles] = useState<
    { name: string; url: string; path: string }[]
  >([]);
  const { user } = useUser();

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
          path: `materials/${file.name}`,
          url: supabaseClient.storage
            .from('storage')
            .getPublicUrl(`materials/${file.name}`).data.publicUrl,
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

  const handleDownload = async (
    bucket: string,
    path: string,
    filename: string,
  ) => {
    try {
      console.log(path);
      const { data, error } = await supabaseClient.storage
        .from(bucket)
        .download(path);

      if (error || !data) {
        console.error('Download error:', error);
        return;
      }

      // Create a URL for the file blob
      const url = URL.createObjectURL(data);

      // Create a temporary anchor and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Cleanup the blob URL
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

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
                <Text>{file.name}</Text>
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
                <Button
                  component="a"
                  download={file.name}
                  onClick={() =>
                    handleDownload('storage', file.path, file.name)
                  }
                  variant="filled"
                  color="teal"
                  fullWidth
                >
                  Download
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

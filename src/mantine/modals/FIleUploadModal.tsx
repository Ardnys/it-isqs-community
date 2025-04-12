import { Badge, Button, FileInput, Stack } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';

export const Test = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => {
  return (
    <Stack>
      {innerProps.modalBody}
      <FileInput
        label="Input label"
        description="Select the file to upload"
        placeholder="Select the file to upload"
      />
      <Button
        onClick={() => {
          context.closeModal(id);
        }}
      >
        close
      </Button>
    </Stack>
  );
};

import {
  Box,
  Button,
  Flex,
  SendOutlined,
  TextFieldInput,
} from "@aircall/tractor";
import { useState } from "react";

interface Props {
  disabled: boolean;
  onSend: (note: string) => boolean | Promise<boolean>;
}

export default function CallNoteInput({ disabled, onSend }: Props) {
  const [note, setNote] = useState<string>("");
  return (
    <Flex flexDirection="row">
      <Box marginRight="20px" flex={1}>
        <TextFieldInput
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Box>
      <Button
        disabled={note.trim().length === 0 || disabled}
        onClick={async () => {
          const success = await onSend(note);
          if (success) {
            setNote("");
          }
        }}
      >
        <SendOutlined /> Send
      </Button>
    </Flex>
  );
}

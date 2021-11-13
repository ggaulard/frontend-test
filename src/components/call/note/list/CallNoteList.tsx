import { Box } from "@aircall/tractor";
import { List } from "antd";
import Note from "../../../../domain/call/note";

import styles from "./CallNoteList.module.css";

interface Props {
  notes: Note[];
}

export default function CallNoteList({ notes }: Props) {
  return (
    <Box position="relative" width="100%">
      <List
        className={styles.list}
        size="small"
        bordered
        dataSource={notes}
        renderItem={(note) => <List.Item>{note.content}</List.Item>}
      />
    </Box>
  );
}

import { ArchiveOutlined, Button, Flex } from "@aircall/tractor";
import { callService } from "../../../../data/call/useCallService";

interface Props {
  selectedCalls: string[];
  onSelectedCallsChange: (callIds: string[]) => void;
}

export default function CallActions({
  selectedCalls,
  onSelectedCallsChange,
}: Props) {
  if (selectedCalls.length === 0) {
    return null;
  }
  return (
    <Flex flexDirection="row" justifyContent="flex-end" p={3}>
      <Button
        size="xSmall"
        disabled={selectedCalls.length === 0}
        onClick={async () => {
          await callService.archive(selectedCalls);
          onSelectedCallsChange([]);
        }}
      >
        <ArchiveOutlined color="white" />
        Archive
      </Button>
    </Flex>
  );
}

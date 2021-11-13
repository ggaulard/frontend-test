import { Box, Flex } from "@aircall/tractor";
import { useState } from "react";
import CallActions from "./actions/CallActions";
import CallList from "./list/CallList";
import CallPagination from "./pagination/CallPagination";

export default function CallNavigation() {
  const [selectedCalls, setSelectedCalls] = useState<string[]>([]);

  return (
    <Flex flexDirection="column" flex="1" minHeight={0}>
      <Box>
        <CallActions
          selectedCalls={selectedCalls}
          onSelectedCallsChange={setSelectedCalls}
        />
      </Box>
      <Box flex={1} overflow="auto">
        <CallList
          selectedCalls={selectedCalls}
          onSelectedCallsChange={setSelectedCalls}
        />
      </Box>
      <Box p={3}>
        <CallPagination />
      </Box>
    </Flex>
  );
}

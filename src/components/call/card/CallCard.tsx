import {
  Box,
  Checkbox,
  IconButton,
  ArchiveOutlined,
  Flex,
} from "@aircall/tractor";
import { Steps } from "antd";
import { callService } from "../../../data/call/useCallService";
import Call from "../../../domain/call/call";
import { formatPhoneNumber } from "react-phone-number-input";

import styles from "./CallCard.module.css";
import { CALL_DIRECTION_MAP, CALL_TYPE_MAP } from "../callIconMaps";

const { Step } = Steps;

interface Props {
  call?: Call;
  isSelected?: boolean;
  onSelectionChange?: (selected: boolean) => void;
  active: boolean;
  onSelect: (call: Call) => void;
}

export default function CallCard({
  call,
  isSelected,
  onSelectionChange,
  active,
  onSelect,
}: Props) {
  if (!call || !onSelectionChange) {
    return <Box></Box>;
  }

  return (
    <Flex
      className={`${styles.card} ${active ? styles.active : ""} ${
        call.isArchived ? styles.archived : ""
      }`}
    >
      <Box padding="0 0 0 10px">
        <Checkbox
          size="small"
          checked={isSelected}
          onChange={(checked) => onSelectionChange(checked)}
        />
      </Box>
      <Box onClick={() => onSelect(call)} className={styles.steps} p={4}>
        <Steps direction="horizontal" size="small" current={2}>
          <Step
            title={formatPhoneNumber(call.from)}
            icon={CALL_DIRECTION_MAP[call.direction]}
          />
          <Step
            title={formatPhoneNumber(call.to)}
            icon={CALL_TYPE_MAP[call.callType]}
          />
        </Steps>
      </Box>
      <Box>
        <IconButton
          className={styles.icon}
          onClick={() => callService.archive(call.id)}
          size={18}
          component={ArchiveOutlined}
          color="primary.base"
        />
      </Box>
    </Flex>
  );
}

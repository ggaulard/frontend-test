import {
  Box,
  Flex,
  MenuVerticalOutlined,
  ArchiveOutlined,
  Typography,
  Button,
} from "@aircall/tractor";
import { Steps } from "antd";
import { formatPhoneNumber } from "react-phone-number-input";
import { callService } from "../../../data/call/useCallService";
import Call, { CallDirection, CallType } from "../../../domain/call/call";
import { CALL_DIRECTION_MAP, CALL_TYPE_MAP } from "../callIconMaps";

import styles from "./CallDetails.module.css";

const { Step } = Steps;

interface Props {
  call?: Call;
  onArchive: () => void;
}

export const CALL_DIRECTION_LABEL_MAP = {
  [CallDirection.inbound]: "Inbound call",
  [CallDirection.outbound]: "Outbound call",
};

export const CALL_TYPE_LABEL_MAP = {
  [CallType.answered]: "Answered",
  [CallType.missed]: "Missed",
  [CallType.voicemail]: "Voice mail",
};

export default function CallDetails({ call, onArchive }: Props) {
  if (!call) {
    return null;
  }

  const callDuration = call.duration.toFormat("hh:mm:ss");
  const callStart = call.createdAt.toFormat("dd/MM/yyyy hh:mm:ss");
  const callEnd = call.createdAt
    .plus(call.duration)
    .toFormat("dd/MM/yyyy hh:mm:ss");

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row" justifyContent="space-between">
        <Steps direction="vertical" size="small" current={4}>
          <Step
            title={
              <Typography variant="displayS" className={styles.phoneNumber}>
                {formatPhoneNumber(call.from)}
              </Typography>
            }
            icon={CALL_DIRECTION_MAP[call.direction]}
            subTitle={CALL_DIRECTION_LABEL_MAP[call.direction]}
            description={`call start : ${callStart}`}
          />
          <Step
            icon={<MenuVerticalOutlined color="primary.base" />}
            title={`via : ${formatPhoneNumber(call.via)}`}
          />
          <Step
            icon={<MenuVerticalOutlined color="primary.base" />}
            title={`duration : ${callDuration}`}
          />
          <Step
            title={
              <Typography variant="displayS" className={styles.phoneNumber}>
                {formatPhoneNumber(call.to)}
              </Typography>
            }
            icon={CALL_TYPE_MAP[call.callType]}
            subTitle={CALL_TYPE_LABEL_MAP[call.callType]}
            description={`call end : ${callEnd}`}
          />
        </Steps>
        <Box>
          <Button onClick={async () => onArchive()}>
            <ArchiveOutlined color="white" />
            {call.isArchived ? "Unarchive" : "Archive"}
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}

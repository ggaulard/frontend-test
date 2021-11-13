import {
  CloseOutlined,
  InboundOutlined,
  OutboundOutlined,
  TickOutlined,
  VoicemailOutlined,
} from "@aircall/tractor";

import { CallDirection, CallType } from "../../domain/call/call";

export const CALL_DIRECTION_MAP = {
  [CallDirection.inbound]: <InboundOutlined color="primary.base" />,
  [CallDirection.outbound]: <OutboundOutlined color="primary.base" />,
};

export const CALL_TYPE_MAP = {
  [CallType.answered]: <TickOutlined color="primary.base" />,
  [CallType.missed]: <CloseOutlined color="primary.base" />,
  [CallType.voicemail]: <VoicemailOutlined color="primary.base" />,
};

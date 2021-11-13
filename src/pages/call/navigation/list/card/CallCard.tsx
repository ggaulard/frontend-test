import Call from "../../../../../domain/call/call";
import CallCardComponent from "../../../../../components/call/card/CallCard";
import { useCallContext } from "../../../../../context/CallContext";

interface Props {
  call: Call;
  selectedCalls: string[];
  onSelectedCallsChange: (callIds: string[]) => void;
}

export default function CallCard({
  call,
  selectedCalls,
  onSelectedCallsChange,
}: Props) {
  const callContext = useCallContext();
  const selectedCall = callContext.call;
  const active = selectedCall?.id === call.id;
  const isSelected = selectedCalls.indexOf(call.id) !== -1;

  const setSelectedCallId = callContext.setCallId;

  function onSelectionChange(selected: boolean) {
    let list = [...selectedCalls];
    if (!selected) {
      list.splice(list.indexOf(call.id), 1);
    } else {
      list.push(call.id);
    }
    onSelectedCallsChange(list);
  }

  function onSelect() {
    if (active) {
      setSelectedCallId(undefined);
    } else {
      setSelectedCallId(call.id);
    }
  }

  return (
    <CallCardComponent
      call={call}
      key={call.id}
      active={active}
      isSelected={isSelected}
      onSelectionChange={onSelectionChange}
      onSelect={onSelect}
    />
  );
}

import { useEffect } from "react";
import { useCallContext } from "../../../../context/CallContext";

interface Params {
  selectedCalls: string[];
  onSelectedCallsChange: (callIds: string[]) => void;
}

export function useCallByDays({
  selectedCalls,
  onSelectedCallsChange,
}: Params) {
  const callContext = useCallContext();
  const { callByDays } = callContext;
  const selectedCall = callContext.call;
  const setSelectedCallId = callContext.setCallId;

  useEffect(() => {
    const callIds = callByDays
      .flatMap((callByDay) => callByDay.calls)
      .map((call) => call.id);
    const list = [...selectedCalls].filter(
      (callId) => callIds.indexOf(callId) !== -1
    );
    if (list.length !== selectedCalls.length) {
      onSelectedCallsChange(list);
    }
  }, [callByDays, selectedCalls, onSelectedCallsChange]);

  return { callByDays, selectedCall, setSelectedCallId };
}

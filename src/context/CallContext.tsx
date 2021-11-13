import { createContext, useContext, useEffect, useState } from "react";
import { CallDTO } from "../data/call/dto/call.dto";
import { callService } from "../data/call/useCallService";
import Call from "../domain/call/call";
import CallByDay from "../domain/call/call-by-day";
import { useUserContext } from "./UserContext";

export interface CallContextState {
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  callByDays: CallByDay[];
  totalCount: number;
  call: Call | undefined;
  setCallId: (callId?: string) => void;
  refreshCall: () => void;
}

interface CallContextProps {}

const CallContext = createContext<CallContextState>({} as CallContextState);

export const DEFAULT_PAGE_SIZE = 10;

export const CallContextProvider: React.FunctionComponent<CallContextProps> = (
  props
) => {
  const { children } = props;

  const { channel } = useUserContext();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const { page, refreshPage } = callService.useCallPage(pageSize, pageIndex);

  const [callId, setCallId] = useState<string | undefined>();
  const { call, refreshCall } = callService.useCall(callId);

  useEffect(() => {
    if (!channel) {
      return;
    }

    function updateCallHandler(callDTO: CallDTO) {
      refreshPage();
      if (callDTO.id === callId) {
        refreshCall();
      }
    }

    channel.bind("update-call", updateCallHandler);
    return () => {
      channel.unbind("update-call", updateCallHandler);
    };
  }, [channel, refreshPage, callId, refreshCall]);

  const state: CallContextState = {
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    callByDays: page?.callByDays || [],
    totalCount: page?.totalCount || 0,
    call,
    setCallId,
    refreshCall,
  };

  return <CallContext.Provider value={state}>{children}</CallContext.Provider>;
};

export function useCallContext() {
  return useContext(CallContext);
}

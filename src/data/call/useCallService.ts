import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import CallPage from "../../domain/call/call-page";
import { fetcher } from "../_utils/fetcher";
import { buildCallPage, CallPageDTO } from "./dto/call-page.dto";
import { buildCall, CallDTO } from "./dto/call.dto";

export const callService = {
  useCallPage: function (pageSize: number, pageIndex: number) {
    const url = `/calls?offset=${pageSize * pageIndex}&limit=${pageSize}`;
    const { data, error, mutate } = useSWR<CallPageDTO>(url);

    const [page, setPage] = useState<CallPage | undefined>(undefined);

    useEffect(() => {
      const isLoading = !error && !data;
      if (!isLoading) {
        setPage(buildCallPage(pageIndex, pageSize, data));
      }
    }, [pageSize, pageIndex, data, error]);
    return { page, refreshPage: mutate };
  },
  useCall: function (callId?: string) {
    const url = callId ? `/calls/${callId}` : null;
    const { data, mutate } = useSWR<CallDTO>(url);
    const call = useMemo(() => (data ? buildCall(data) : undefined), [data]);
    return { call, refreshCall: mutate };
  },
  archive: function (callId: string | string[]) {
    async function archive(callId: string) {
      return fetcher(`/calls/${callId}/archive`, { method: "PUT" });
    }
    if (Array.isArray(callId)) {
      return new Promise<void>(async (resolve, reject) => {
        try {
          for (let i = 0; i < callId.length; i++) {
            await archive(callId[i]);
          }
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    } else {
      archive(callId);
    }
  },
  sendNote: async function (callId: string, content: string) {
    return fetcher(`/calls/${callId}/note`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },
};

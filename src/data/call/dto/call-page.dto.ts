import { DateTime } from "luxon";
import Call from "../../../domain/call/call";
import CallByDay from "../../../domain/call/call-by-day";
import CallPage from "../../../domain/call/call-page";
import { buildCall, CallDTO } from "./call.dto";

export interface CallPageDTO {
  nodes: CallDTO[];
  totalCount: number;
  hasNextPage: boolean;
}

function buildCallByDayMap(calls: Call[]) {
  const map: { [key: string]: Call[] } = {};
  calls.forEach((call) => {
    const dayKey = call.createdAt.toISODate();
    if (!map[dayKey]) {
      map[dayKey] = [];
    }
    map[dayKey].push(call);
  });
  return map;
}

function buildCallByDay(calls?: CallDTO[]) {
  if (!calls) {
    return [];
  }

  const map = buildCallByDayMap(calls.map(buildCall));

  return Object.entries(map).map((entry) => {
    const callByDay = new CallByDay();
    callByDay.day = DateTime.fromISO(entry[0]);
    callByDay.calls = entry[1];
    return callByDay;
  });
}

export function buildCallPage(
  pageIndex: number,
  pageSize: number,
  dto?: CallPageDTO
): CallPage | undefined {
  if (!dto) {
    return undefined;
  }
  const domain = new CallPage();
  domain.callByDays = buildCallByDay(dto.nodes);
  domain.pageCount = Math.ceil(dto.totalCount ? dto.totalCount / pageSize : 0);
  domain.totalCount = dto.totalCount;
  domain.index = pageIndex;
  return domain;
}

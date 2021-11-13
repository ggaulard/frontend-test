import { DateTime, Duration } from "luxon";
import Call, { CallDirection, CallType } from "../../../domain/call/call";
import { buildNote, NoteDTO } from "./note.dto";

export interface CallDTO {
  id: string;
  direction: string;
  call_type: string;
  created_at: string;
  duration: number;
  from: string;
  to: string;
  is_archived: boolean;
  via: string;
  notes: NoteDTO[];
}

export function buildCall(dto: CallDTO): Call {
  if (!Object.values(CallDirection as any).includes(dto.direction)) {
    throw new Error("Unknown call direction");
  }
  if (!Object.values(CallType as any).includes(dto.call_type)) {
    throw new Error("Unknown call type");
  }
  if (!DateTime.fromISO(dto.created_at).isValid) {
    throw new Error("Unvalid call created at");
  }
  const domain = new Call();
  domain.id = dto.id;
  domain.direction = CallDirection[dto.direction as keyof typeof CallDirection];
  domain.callType = CallType[dto.call_type as keyof typeof CallType];
  domain.createdAt = DateTime.fromISO(dto.created_at);
  domain.duration = Duration.fromMillis(dto.duration * 1000);
  domain.from = dto.from;
  domain.to = dto.to;
  domain.isArchived = dto.is_archived;
  domain.via = dto.via;
  domain.notes = dto.notes ? dto.notes.map((d) => buildNote(d)) : [];
  return domain;
}

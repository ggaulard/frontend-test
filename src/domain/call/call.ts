import { DateTime, Duration } from "luxon";
import Note from "./note";

export enum CallType {
  missed = "missed",
  answered = "answered",
  voicemail = "voicemail",
}
export enum CallDirection {
  inbound = "inbound",
  outbound = "outbound",
}

export default class Call {
  id!: string; // "unique ID of call"
  direction!: CallDirection; // "inbound" or "outbound" call
  callType!: CallType; // The type of the call, it can be a missed, answered or voicemail.
  createdAt!: DateTime; // When the call has been made.
  duration!: Duration; // Duration of a call (in seconds)
  from!: string; // Caller's number
  to!: string; // Callee's number
  isArchived!: boolean; // Boolean that indicates if the call is archived or not
  via!: string; // Aircall number used for the call.
  notes!: Note[]; // Notes related to a given call
}

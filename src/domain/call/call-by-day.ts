import { DateTime } from "luxon";
import Call from "./call";

export default class CallByDay {
  day!: DateTime;
  calls!: Call[];
}

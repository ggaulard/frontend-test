import { Flex, Typography } from "@aircall/tractor";
import { useState } from "react";
import CallDetailsComponent from "../../../components/call/details/CallDetails";
import CallNoteInput from "../../../components/call/note/input/CallNoteInput";
import CallNoteList from "../../../components/call/note/list/CallNoteList";
import { useCallContext } from "../../../context/CallContext";
import { callService } from "../../../data/call/useCallService";

export default function CallDetails() {
  const { call, refreshCall } = useCallContext();
  const [noteSending, setNoteSending] = useState<boolean>(false);

  async function onNoteSend(note: string): Promise<boolean> {
    if (!call) {
      return false;
    }

    setNoteSending(true);
    try {
      await callService.sendNote(call.id, note);
      refreshCall();
      return true;
    } catch (e) {
      console.log(e);
    } finally {
      setNoteSending(false);
    }
    return false;
  }

  return (
    <Flex flexDirection="column" flex={1} minHeight={0}>
      <CallDetailsComponent
        call={call}
        onArchive={async () => {
          if (!call) {
            return;
          }
          await callService.archive(call.id);
          refreshCall();
        }}
      />
      {call && (
        <>
          <Typography variant="displayS2" style={{ marginTop: "40px" }}>
            Notes
          </Typography>
          <Flex
            flex={1}
            minHeight={0}
            width="100%"
            style={{ margin: "20px 0" }}
          >
            <CallNoteList notes={call.notes} />
          </Flex>
          <CallNoteInput disabled={noteSending} onSend={onNoteSend} />
        </>
      )}
    </Flex>
  );
}

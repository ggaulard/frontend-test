import React, { useMemo } from "react";
import HeaderList from "../../../../components/data/display/list/header/HeaderList";

import CallCard from "./card/CallCard";

import { useCallByDays } from "./useCallByDays";

interface Props {
  selectedCalls: string[];
  onSelectedCallsChange: (callIds: string[]) => void;
}

export default function CallList({
  selectedCalls,
  onSelectedCallsChange,
}: Props) {
  const { callByDays } = useCallByDays({
    selectedCalls,
    onSelectedCallsChange,
  });

  const data = useMemo(() => {
    return {
      headers: callByDays.map((callByDay) => ({
        headerRef: callByDay.day.toISODate(),
        header: callByDay.day.toFormat("dd/MM/yyyy"),
        items: callByDay.calls.map((call) => ({
          ref: call.id,
          item: (
            <CallCard
              key={call.id}
              call={call}
              onSelectedCallsChange={onSelectedCallsChange}
              selectedCalls={selectedCalls}
            />
          ),
        })),
      })),
    };
  }, [callByDays, selectedCalls, onSelectedCallsChange]);

  return <HeaderList data={data} />;
}

/**
 * 

    <Box className={styles.list}>
      {callByDays.map((callByDay) => (
        <React.Fragment key={callByDay.day.toISODate()}>
          <Box className={styles.header} bg="grey.light" p={3}>
            {callByDay.day.toFormat("dd/MM/yyyy")}
          </Box>
          {callByDay.calls.map((call) => (
            <CallCard
              key={call.id}
              call={call}
              onSelectedCallsChange={onSelectedCallsChange}
              selectedCalls={selectedCalls}
            />
          ))}
        </React.Fragment>
      ))}
    </Box>
 */

import { Flex, Grid } from "@aircall/tractor";
import { CallContextProvider } from "../../context/CallContext";
import CallDetails from "./details/CallDetails";
import CallsHeader from "./header/CallHeader";
import CallNavigation from "./navigation/CallNavigation";

export default function CallPage() {
  return (
    <CallContextProvider>
      <Grid
        gridTemplateAreas="'head head' 'navigation detail'"
        gridTemplateRows="100px 1fr"
        gridTemplateColumns="400px 1fr"
        gridGap={3}
        height="100vh"
      >
        <Flex
          gridArea="head"
          alignItems="center"
          justifyContent="space-between"
          p={3}
        >
          <CallsHeader />
        </Flex>
        <Flex gridArea="navigation" flexDirection="column" minHeight={0}>
          <CallNavigation />
        </Flex>
        <Flex gridArea="detail" flexDirection="column" p={3}>
          <CallDetails />
        </Flex>
      </Grid>
    </CallContextProvider>
  );
}

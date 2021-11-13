import { Channel } from "pusher-js";
import { createContext, useContext, useEffect, useState } from "react";
import { authenticationService } from "../data/authentication/useAuthenticationService";
import { authenticationStore } from "../data/_utils/authenticateStore";
import { buildPusher } from "../data/_utils/pusher";
import User from "../domain/user/user";

export interface UserContextState {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  channel: Channel | undefined;
}

interface UserContextProps {}

const UserContext = createContext<UserContextState>({} as UserContextState);

export const UserContextProvider: React.FunctionComponent<UserContextProps> = (
  props
) => {
  const { children } = props;

  const [user, setUser] = useState<User | undefined>();
  const [channel, setChannel] = useState<Channel>();
  const meUser = authenticationService.useUser();

  useEffect(() => {
    if (!user && !meUser) {
      return;
    }
    const pusher = buildPusher(authenticationStore.getItem("access_token")!);
    setChannel(pusher.subscribe("private-aircall"));
    return () => {
      pusher.unsubscribe("private-aircall");
      setChannel(undefined);
    };
  }, [user, meUser]);

  const state: UserContextState = {
    user: user || meUser,
    setUser,
    channel,
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  return useContext(UserContext);
}

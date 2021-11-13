import { useMemo } from "react";
import useSWR from "swr";
import User from "../../domain/user/user";
import { API_BASE } from "../_utils/api";
import { LoginResponseDTO } from "./dto/login-response.dto";
import { buildUser, UserDTO } from "./dto/user.dto";

export const authenticationService = {
  login: async function (username: string, password: string) {
    const result: LoginResponseDTO = await fetch(API_BASE + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json());
    return result;
  },
  useUser: function (): User | undefined {
    const { data } = useSWR<UserDTO>("/me");
    const user = useMemo(() => buildUser(data), [data]);
    return user;
  },
};

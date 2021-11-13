import { useNavigate } from "react-router";
import { useUserContext } from "../../context/UserContext";
import { authenticationService } from "../../data/authentication/useAuthenticationService";
import { authenticationStore } from "../../data/_utils/authenticateStore";

const HOMEPAGE_URL = "/calls";

export function useLogin() {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  return {
    login: (username: string, password: string) => {
      authenticationService.login(username, password).then((r) => {
        const { access_token, refresh_token, user } = r;
        authenticationStore.setItem("access_token", access_token);
        authenticationStore.setItem("refresh_token", refresh_token);
        setUser(user);

        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get("redirect");
        if (redirect) {
          navigate(redirect, { replace: true });
        } else {
          navigate(HOMEPAGE_URL);
        }
      });
    },
  };
}

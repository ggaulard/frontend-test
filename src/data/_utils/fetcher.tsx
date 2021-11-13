import { API_BASE } from "./api";
import { authenticationStore } from "./authenticateStore";

const LOGIN_URL = "/login";
const REFRESH_JWT_URL = API_BASE + "/auth/refresh-token-v2";

export const fetcher = async (input: string, init?: RequestInit) => {
  let res = await fetch(API_BASE + input, assignAccessToken(init));

  // current jwt is not valid anymore
  if (res.status === 401) {
    // if there is no refresh token available, we redirect to login screen
    if (!authenticationStore.getItem("refresh_token")) {
      displayLoginPage();
      return;
    }

    // refresh token is available, we try a refresh
    const isRefreshValid = await refreshJwt();

    // the refresh didn't succeed we retdirect to the login screen
    if (!isRefreshValid) {
      displayLoginPage();
      return;
    }

    // access token is valid now, we make the call again
    res = await fetch(API_BASE + input, assignAccessToken(init));
  }

  return res.json();
};

function refreshJwt() {
  return fetch(
    REFRESH_JWT_URL,
    assignRefreshToken({
      method: "POST",
    })
  ).then(async (res) => {
    if (res.status !== 401) {
      const result = await res.json();
      const jwt = result.access_token;
      authenticationStore.setItem("access_token", jwt);
      return true;
    }
    return false;
  });
}

function displayLoginPage() {
  authenticationStore.removeItem("access_token");
  authenticationStore.removeItem("refresh_token");
  if (document.location.pathname.startsWith(LOGIN_URL)) {
    return;
  }
  document.location.replace(
    LOGIN_URL + "?redirect=" + document.location.pathname
  );
}

function assignAccessToken(init?: RequestInit) {
  return assignAuthorization(authenticationStore.getItem("access_token"), init);
}

function assignRefreshToken(init?: RequestInit) {
  return assignAuthorization(
    authenticationStore.getItem("refresh_token"),
    init
  );
}

function assignAuthorization(token?: string, init?: RequestInit) {
  if (token) {
    if (!init) {
      init = {};
    }
    if (!init.headers) {
      init.headers = {};
    }
    const h: any = init.headers!;
    h["Accept"] = "application/json";
    h["Content-Type"] = "application/json";
    h["authorization"] = `Bearer ${token}`;
  }
  return init;
}

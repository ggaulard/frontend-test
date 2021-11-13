import Pusher from "pusher-js";

const AUTH_ENDPOINT = process.env.REACT_APP_PUSHER_APP_AUTH_ENDPOINT;
const APP_KEY = process.env.REACT_APP_PUSHER_APP_KEY;
const APP_CLUSTER = process.env.REACT_APP_PUSHER_APP_CLUSTER;

if (!AUTH_ENDPOINT) {
  throw new Error(
    "Please define env variable REACT_APP_PUSHER_APP_AUTH_ENDPOINT"
  );
}
if (!APP_KEY) {
  throw new Error("Please define env variable APP_KEY");
}
if (!APP_CLUSTER) {
  throw new Error("Please define env variable APP_CLUSTER");
}

export const buildPusher = (accessToken: string) => {
  return new Pusher(APP_KEY, {
    cluster: APP_CLUSTER,
    authEndpoint: AUTH_ENDPOINT,
    auth: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
};

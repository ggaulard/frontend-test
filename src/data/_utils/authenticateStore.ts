type STORED_TYPE = "access_token" | "refresh_token";

export const authenticationStore = {
  setItem: (type: STORED_TYPE, value: string) => {
    localStorage.setItem(type, value);
  },
  getItem: (type: STORED_TYPE): string | undefined => {
    return localStorage.getItem(type) || undefined;
  },
  removeItem: (type: STORED_TYPE) => {
    localStorage.removeItem(type);
  },
};

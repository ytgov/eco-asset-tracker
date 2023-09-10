export const databaseURL =
  import.meta.env.VITE_DATABASE_URL + "/" + import.meta.env.VITE_INSTANCE;
export const auth = import.meta.env.VITE_KEY;

export const API_HOST = "http://localhost:8081";

export const apiBaseUrl = import.meta.env.MODE == "production" ? "" : API_HOST;

export const applicationName = "ECO Assets";

export const authConfig = {
  domain: import.meta.env.VITE_ISSUER_BASE_URL,
  clientId: import.meta.env.VITE_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
};

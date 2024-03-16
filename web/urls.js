import * as config from "./config";

export const LOGIN_URL = `${config.apiBaseUrl}/api/auth/login`;
export const AUTH_CHECK_URL = `${config.apiBaseUrl}/api/auth/isAuthenticated`;
export const LOGOUT_URL = `${config.apiBaseUrl}/api/auth/logout`;
export const PROFILE_URL = `${config.apiBaseUrl}/api/users/me`;
export const USER_URL = `${config.apiBaseUrl}/api/users`;
export const POST_LOGOUT_URL = `${window.location.origin}/login`;

// App specific URLS
export const ROOMS_URL = `${config.apiBaseUrl}/api/rooms`;
export const ASSETS_URL = `${config.apiBaseUrl}/api/assets`;
export const KEYS_URL = `${config.apiBaseUrl}/api/keys`;
export const EMPLOYEE_URL = `${config.apiBaseUrl}/api/employees`;

export const HEALTHCHECK_URL = `${config.apiBaseUrl}/api/healthcheck`;

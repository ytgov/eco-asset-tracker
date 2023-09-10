import * as config from "./config";

export const LOGIN_URL = `${config.apiBaseUrl}/auth/login`;
export const AUTH_CHECK_URL = `${config.apiBaseUrl}/api/auth/isAuthenticated`;
export const ISADMIN_URL = `${config.apiBaseUrl}/auth/isAdmin`;
export const LOGOUT_URL = `${config.apiBaseUrl}/auth/logout`;
export const PROFILE_URL = `${config.apiBaseUrl}/profile`;
export const SMS_TEST_URL = `${config.apiBaseUrl}/sms/notify`;
export const SMS_GROUP_URL = `${config.apiBaseUrl}/sms/notify`;

// export const INSERVICE_URL = `${config.databaseURL}/api/inservice`;
// export const OUTSERVICE_URL = `${config.databaseURL}/api/outservice`;
// export const INSERVICE_URL = `${config.databaseURL}/_design/serviceStatus/_view/inService`;
// export const OUTSERVICE_URL = `${config.databaseURL}/_design/serviceStatus/_view/outService`;
// export const MEMBER_URL = `${config.databaseURL}/`;

export const INSERVICE_URL = `${config.apiBaseUrl}/api/status/in-service`;
export const OUTSERVICE_URL = `${config.apiBaseUrl}/api/status/out-service`;
export const MEMBER_URL = `${config.apiBaseUrl}/api/status`;
export const PAGING_URL = `${config.apiBaseUrl}/api/paging`;
export const CALLS_URL = `${config.apiBaseUrl}/api/calls`;
export const MEMBER2_URL = `${config.apiBaseUrl}/api/members`;

// export const PROFILE_URL = `${config.apiBaseUrl}/api/user/me`;

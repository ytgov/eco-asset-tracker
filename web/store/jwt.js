import axios from "axios";
import { auth0 } from "@/plugins/auth";

async function getAccessTokenSilentlyOutsideComponent(options) {
  return auth0.getAccessTokenSilently(options);
}

function isAuthenticated() {
  return auth0.isAuthenticated.value;
}

// import { getInstance } from "@/auth/auth0-plugin";

export async function prepareAxios() {
  let headers = {
    "Content-Type": "application/json",
  };

  if (isAuthenticated()) {
    let token = await getAccessTokenSilentlyOutsideComponent();
    headers["Authorization"] = `Bearer ${token}`;
  }

  return axios.create({
    headers,
  });
}

export async function secureGet(url) {
  let api = await prepareAxios();
  return api.get(url);
}

export async function securePut(url, body) {
  let api = await prepareAxios();
  return api.put(url, body);
}

export async function securePost(url, body) {
  let api = await prepareAxios();
  return api.post(url, body);
}

export async function secureDelete(url) {
  let api = await prepareAxios();
  return api.delete(url);
}

import { KEYS_URL } from "@/urls";
import axios from "axios";
import randomID from "./utils";
// import store from  "@/store";

const state = {
  updating: false,
  updatingPersonnel: false,
  keys: [],
  currentKey: {},
  assignedRooms: [], //hack becuase Vue doesn't catch the update to currentKey.assignedRooms
  assignedPersonnel: [], //hack becuase Vue doesn't catch the update to currentKey.assignedPersonnel
};
const getters = {
  getKeysByRoom: (state) => (roomID) => {
    return state.keys.filter((key) => key.room == roomID);
  },
};

const actions = {
  async initialize({ state, dispatch }) {
    await dispatch("getAllKeys");
    console.log(`Loaded ${state.keys.length} keys`);
  },
  async getAllKeys({ commit }) {
    await axios.get(KEYS_URL).then((response) => {
      commit("SET_KEY_LIST", response.data);
    });
  },
  async getKey({ commit }, keyID) {
    return await axios
      .get(`${KEYS_URL}/${keyID}`)
      .then((resp) => {
        if (resp.status === 200) {
          commit("SET_KEY", resp.data);
          return resp.data;
        } else {
          commit("SET_KEY", {});
          return null;
        }
      })
      .catch((error) => {
        console.log(`Error retrieving key ${keyID}`);
        console.error(error);
        return error;
      });
  },
  async saveKey({ commit, state, dispatch }) {
    console.log(`Saving key with id: ${state.currentKey._id}`);
    axios
      .put(`${KEYS_URL}/${state.currentKey._id}`, state.currentKey)
      .then((response) => {
        if (response.status === 200) {
          commit("SET_KEY", state.currentKey);
          dispatch("getAllKeys");
        } else {
          console.log("Error saving key: " + response.status);
          commit("SET_KEY", {});
        }
      });
  },
  async createKey({ commit, dispatch }, key) {
    key._id = randomID();
    await axios
      .post(`${KEYS_URL}`, key)
      .then((response) => {
        if (response.status === 200) {
          dispatch("getAllKeys");
          commit("SET_KEY", key);
          return "Key created";
        }
      })
      .catch((error) => {
        console.log("Error creating key: " + error);
        return error;
      });
  },
  deleteKey({ commit, dispatch }, keyID) {
    axios.delete(`${KEYS_URL}/${keyID}`).then((response) => {
      if (response.status === 200) {
        dispatch("getAllKeys");
        commit("SET_KEY", {});
        return response.status;
      } else {
        console.log("Error deleting key: " + keyID);
        commit("SET_KEY", {});
      }
    });
  },
  clearKey({ commit }) {
    commit("SET_KEY", {});
  },
  async getKeyPurposes() {
    return axios
      .get(`${KEYS_URL}/purposes`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getAssignedRoomKeys({ commit, state }) {
    let auth = axios;
    let response = await auth
      .get(`${KEYS_URL}/${state.currentKey._id}/rooms`)
      .then((resp) => {
        if (resp.status == 200) {
          commit("SET_ASSIGNED_ROOMS", resp.data);
          return resp.data;
        } else {
          return { error: "Error retrieving assigned rooms" };
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  },
  async assignRoomsToKey({ dispatch, commit }, assignments) {
    commit("SET_UPDATE", true);
    let auth = axios;
    let keyID = assignments.key;
    let response = await auth
      .post(`${KEYS_URL}/${keyID}/rooms`, assignments)
      .then(async (response) => {
        if (response.status === 200) {
          await dispatch("getAssignedRoomKeys", keyID);
          return response.data;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
    commit("SET_UPDATE", false);
    return response;
  },
  async getAssignedPersonnelKeys({ commit, state }) {
    let auth = axios;
    return await auth
      .get(`${KEYS_URL}/${state.currentKey._id}/personnel`)
      .then((resp) => {
        if (resp.status == 200) {
          commit("SET_PERSONNEL_KEY", resp.data);
          return resp.data;
        } else {
          return { "Unexpected response": resp.status };
        }
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
  },
  async assignPersonnelToKey({ commit, dispatch }, assignments) {
    commit("SET_UPDATE_PERSONNEL", true);
    let auth = axios;
    let keyID = assignments.key;
    let response = await auth
      .post(`${KEYS_URL}/${keyID}/personnel`, assignments)
      .then(async (response) => {
        if (response.status === 200) {
          await dispatch("getAssignedPersonnelKeys", keyID);
          return response.data;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
    commit("SET_UPDATE_PERSONNEL", false);
    return response;
  },
};

const mutations = {
  SET_KEY_LIST(state, payload) {
    state.keys = payload;
  },
  SET_KEY(state, payload) {
    state.currentKey = payload;
  },
  SET_ASSIGNED_ROOMS(state, payload) {
    state.assignedRooms = payload;
    // state.currentKey.assignedRooms = payload;
  },
  SET_UPDATE(state, payload) {
    state.updating = payload;
  },
  SET_PERSONNEL_KEY(state, payload) {
    state.assignedPersonnel = payload;
    // state.currentKey.assginedPersonnel = payload;
  },
  SET_UPDATE_PERSONNEL(state, payload) {
    state.updatingPersonnel = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

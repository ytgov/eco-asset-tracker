import { KEYS_URL } from "@/urls";
import axios from "axios";
import randomID from "./utils";
// import store from  "@/store";

const state = {
  keys: [],
  currentKey: {},
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
      .then((response) => {
        commit("SET_KEY", response.data);
        return response.data;
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
};

const mutations = {
  SET_KEY_LIST(state, payload) {
    state.keys = payload;
  },
  SET_KEY(state, payload) {
    state.currentKey = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

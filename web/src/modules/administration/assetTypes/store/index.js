// import { ROOMS_URL } from "@/urls";
import axios from "axios";
import { ASSETS_URL } from "@/urls";
// import store from  "@/store";

const state = {
  assetTypes: [
    {
      _id: 0,
      name: "Cell Phone",
      office: true,
      person: false,
      infrastructure: false,
    },
    {
      _id: 1,
      name: "Laptop",
      office: true,
      person: true,
      infrastructure: false,
    },
    {
      _id: 2,
      name: "Landline",
      office: false,
      person: false,
      infrastructure: true,
    },
    {
      _id: 3,
      name: "Pack Pole",
      office: false,
      person: false,
      infrastructure: true,
    },
  ],
};
const getters = {};
const actions = {
  async initialize({ state, dispatch }) {
    await dispatch("getAssetTypes");
    console.log(`Loaded ${state.assetTypes.length} asset types`);
  },

  async getAssetTypes({ commit }) {
    return await axios
      .get(`${ASSETS_URL}/types`)
      .then((response) => {
        console.log(`Loaded ${response.data.length} asset types`);
        commit("SET_ASSET_TYPES", response.data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
  async addAssetType({ dispatch }, payload) {
    console.log(payload);
    return axios
      .post(`${ASSETS_URL}/types`, payload)
      .then((response) => {
        console.log(response.data);
        dispatch("getAssetTypes");
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },

  // async getAllUsers({ commit }) {
  //   commit("SET_USERS_LIST", ["array", "of", "users"]);
  //   return "Future home a of users";
  // },
  // async toggleAdmin({ commit, state }) {
  //   commit("SET_ADMIN", !state.user.admin);
  // }
};

const mutations = {
  SET_ASSET_TYPES(state, payload) {
    state.assetTypes = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

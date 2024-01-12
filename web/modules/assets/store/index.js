import { ASSETS_URL } from "@/urls";
import axios from "axios";
import randomID from "@/utils/randomValueHex";
// import store from  "@/store";

const state = {
  assets: [],
  currentAsset: {},
};
const getters = {
  getAssetsByRoom: (state) => (roomID) => {
    return state.assets.filter((asset) => asset.room == roomID);
  },
};
const actions = {
  async initialize({ state, dispatch }) {
    await dispatch("getAllAssets");
    console.log(`Loaded ${state.assets.length} assets`);
  },
  async assignRoom({ state, commit, dispatch }, roomID) {
    await commit("ASSIGN_ROOM", roomID);
    await dispatch("saveAsset", roomID);
    console.log(`Assigned room ${roomID} to asset ${state.currentAsset._id}`);
  },
  async getAllAssets({ commit }) {
    await axios.get(ASSETS_URL).then((response) => {
      commit("SET_ASSET_LIST", response.data);
    });
  },
  async getAsset({ commit }, assetID) {
    await axios
      .get(`${ASSETS_URL}/${assetID}`)
      .then((response) => {
        commit("SET_ASSET", response.data);
      })
      .catch((error) => {
        console.log(`Error retrieving asset ${assetID}`);
        console.error(error);
      });
  },
  async saveAsset({ commit, state, dispatch }) {
    console.log(`Saving asset with id: ${state.currentAsset._id}`);
    await axios
      .put(`${ASSETS_URL}/${state.currentAsset._id}`, state.currentAsset)
      .then((response) => {
        if (response.status === 200) {
          commit("SET_ASSET", state.currentAsset);
          dispatch("getAllAssets");
        } else {
          console.log("Error saving asset: " + response.status);
          commit("SET_ASSET", {});
        }
      });
  },
  async createAsset({ commit, dispatch }, asset) {
    asset._id = randomID();
    await axios.post(`${ASSETS_URL}`, asset).then((response) => {
      if (response.status === 200) {
        dispatch("getAllAssets");
        commit("SET_ASSET", asset);
        return "Asset created";
      }
      // else {
      return "Error creating ";
      //  }
    });
  },
  async deleteAsset({ commit, dispatch }, assetID) {
    return await axios.delete(`${ASSETS_URL}/${assetID}`).then((response) => {
      if (response.status === 200) {
        dispatch("getAllAssets");
        commit("SET_ASSET", {});
        return response;
      } else {
        console.log("Error deleting asset: " + assetID);
        commit("SET_ASSET", {});
        response.messages = "Error deleting asset";
        return response;
      }
    });
  },
  clearAsset({ commit }) {
    commit("SET_ASSET", {});
  },
  async getAssetPurposes() {
    return axios
      .get(`${ASSETS_URL}/purposes`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async updateAssetPerson({ commit }, person) {
    await commit("SET_ASSET_PERSON", person);
  },
};

const mutations = {
  SET_ASSET_LIST(state, payload) {
    state.assets = payload;
  },
  SET_ASSET(state, payload) {
    // console.log("Setting asset: " + payload._id);
    state.currentAsset = payload;
  },
  ASSIGN_ROOM(state, payload) {
    state.currentAsset.room = payload;
  },
  SET_ASSET_PERSON(state, payload) {
    state.currentAsset.person = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

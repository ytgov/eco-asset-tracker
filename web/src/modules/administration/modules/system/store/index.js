// import { ROOMS_URL } from "@/urls";
// import axios from "axios";
// import store from  "@/store";

const state = {
  user: {
    username: "Offline User",
    admin: false
  },
  users: []
};
const getters = {
  isAdmin: state => {
    return state.user.admin;
  }
  // admins (state => users.filter("group.admin === true"))
};
const actions = {
  // async getAllUsers ({commit}) {
  //   axios.get(USERS_URL).then(response => {
  //     commit("SET_USERS_LIST", response.data);
  //   })
  // },
  async getAllUsers({ commit }) {
    commit("SET_USERS_LIST", ["array", "of", "users"]);
    return "Future home a of users";
  },
  async toggleAdmin({ commit, state }) {
    commit("SET_ADMIN", !state.user.admin);
  }
};

const mutations = {
  SET_USERS_LIST(state, payload) {
    state.users = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_ADMIN(state, payload) {
    state.user.admin = payload;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

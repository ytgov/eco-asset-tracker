// import { ROOMS_URL } from "@/urls";
// import axios from "axios";
// import store from  "@/store";

const state = {
  user: {
    username: "Offline User",
    admin: false,
  },
  userList: [],
  roleOptions: ["System Admin", "Editor", "User"],
};
const getters = {
  isAdmin: (state) => {
    return state.user.admin;
  },
  // admins (state => users.filter("group.admin === true"))
};
const actions = {
  async createUser({ commit }, user) {
    //axios.post(USERS_URL, user);

    commit("ADD_USER", user);
    return user;
  },
  async saveUser({ commit }, user) {
    let q = state.userList.findIndex((u) => u.email === user.email);
    console.log(q);
    console.log(state.userList[q]);
    commit("SET_USER", user);

    return user;
  },

  // async getAllUsers ({commit}) {
  //   axios.get(USERS_URL).then(response => {
  //     commit("SET_USERS_LIST", response.data);
  //   })
  // },
  async getAllUsers({ commit }) {
    commit("SET_USER_LIST", [
      {
        display_name: "John Smith",
        email: "me@Headers.com",
        status: "Active",
        roles: "User",
      },
      {
        display_name: "Jane Doe",
        email: "them@here.com",
        status: "Inactive",
        roles: "Admin",
      },
    ]);

    console.log(`Loaded ${state.userList.length} users`);
    return "Future home of users";
  },
  async toggleAdmin({ commit, state }) {
    commit("SET_ADMIN", !state.user.admin);
  },
};

const mutations = {
  SET_USER_LIST(state, payload) {
    state.userList = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_ADMIN(state, payload) {
    state.user.admin = payload;
  },
  ADD_USER(state, user) {
    state.userList.push(user);
  },
  SAVE_USER(state, user) {
    let q = state.userList.findIndex((u) => u.email === user.email);
    console.log(q);
    state.userList[q] = user;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

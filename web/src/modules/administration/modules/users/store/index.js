import { USER_URL } from "@/urls";
import axios from "axios";
// import store from  "@/store";

const state = {
  currentUser: {
    name: "Test User",
    email: "john.doe@yukon.ca",
    roles: "User",
  },
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
  isEditor: (state, getters) => {
    if (state.currentUser.roles.includes("Editor") || getters.isAdmin == true) {
      return true;
    } else return false;
  },
  // admins (state => users.filter("group.admin === true"))
};
const actions = {
  async createUser({ dispatch }, user) {
    const auth = axios;
    user.modified_by = state.currentUser.email;
    user.created_at = new Date();
    delete user.long_name;
    delete user.officeLocation;
    delete user.userPrincipalName;

    return await auth
      .post(USER_URL, user)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          // commit("setCurrentEmployee", response.data);
          dispatch("getAllUsers");
          return response;
        } else {
          console.log("Unable to save user...");

          return response;
        }
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
  },
  async saveUser({ dispatch }, user) {
    const auth = axios;
    user.modified_by = state.currentUser.email;
    user.modified = new Date();
    return await auth
      .put(`${USER_URL}/${user.email}`, user)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch("getAllUsers");
          return response;
        } else {
          console.log("Unable to save user...");
          return response;
        }
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
  },

  // async getAllUsers ({commit}) {
  //   axios.get(USERS_URL).then(response => {
  //     commit("SET_USERS_LIST", response.data);
  //   })
  // },
  async getAllUsers({ commit }) {
    const response = await axios
      .get(USER_URL)
      .then((response) => {
        if (response.status === 200) {
          commit("SET_USER_LIST", response.data);
          return response.data;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
    return response;
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
  // SAVE_USER(state, user) {
  //   // let q = state.userList.findIndex((u) => u.email === user.email);
  //   // state.userList[q] = user;
  // },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

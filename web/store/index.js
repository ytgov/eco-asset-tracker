import { createStore } from "vuex";
import { auth0 } from "@/plugins/auth";

// import { secureGet } from "./jwt";
// import { USER_URL } from "@/urls";

import auth from "./auth";
import home from "@/modules/home/store";
import personnel from "@/modules/personnel/store";
import administration from "@/modules/administration/store";
import rooms from "@/modules/rooms/store";
import assets from "@/modules/assets/store";
import keys from "@/modules/keys/store";

// import forms from "@/modules/forms/store";

export const store = createStore({
  getters: {
    isAuthenticated: () => {
      console.log("in store!");
      return auth0.isAuthenticated.value;
    },
  },
  state: {
    fromStore: "Jane Doe",
    user: {},
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async initialize() {
      console.log("Initializing Store");
      // await this.dispatch("department/initialize");
      await this.dispatch("administration/initialize");
      await this.dispatch("rooms/initialize");
      await this.dispatch("assets/initialize");
      await this.dispatch("keys/initialize");
      await this.dispatch("personnel/initialize");
      await this.dispatch("home/initialize");

      console.log("Initializing Complete");
    },
    async getCurrentUser(state) {
      // let userResp = await secureGet(`${USER_URL}/me`);
      // state.commit("SET_USER", userResp.data);
      // return userResp.data;
    },
  },
  modules: {
    home,
    auth,
    rooms,
    assets,
    keys,
    personnel,
    // authority,
    // department,
    administration,
    // forms
  },
});

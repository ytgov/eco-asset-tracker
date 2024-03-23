<template>
  <navAppBar />
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script>
import router from "@/router";
// import store from "./store";

import { mapActions, mapState, mapGetters } from "vuex";
import * as config from "@/config";
import { LOGOUT_URL } from "@/urls";
//import { getInstance } from "@/auth/auth0-plugin";

import navAppBar from "./components/nav/navAppBar.vue";

export default {
  name: "LayoutView",
  components: {
    navAppBar,
  },
  data: () => ({
    dialog: false,
    drawer: null,
    drawerRight: null,
    headerShow: false,
    menuShow: false,
    loadingClass: "d-none",
    applicationName: config.applicationName,
    sections: [],
    hasSidebar: false, //config.hasSidebar,
    search: "",
    showAdmin: true,
  }),
  computed: {
    ...mapState("administration/users", ["user"]),
    ...mapGetters("administration/users", ["isAdmin"]),
    showOverlay: function () {
      return this.$auth.isLoading;
    },
    username() {
      // return this.user.username;
      if (this.$auth.isAuthenticated) {
        return this.$auth.user.name;
      }
      return "Not Authenticated";
    },

    returnTo: function () {
      return config.applicationUrl;
    },
  },

  async mounted() {
    //let auth = await getInstance();
    //await auth.getTokenSilently();
    // await this.initialize();
    // this.showOverlay = false;
  },
  watch: {
    $route(to) {
      let meta = to.meta || {};

      if (meta.children) {
        this.sections = meta.children;
        this.hasSidebar = true;
      } else {
        this.sections = [];
        this.hasSidebar = false;
      }
    },
    roles: function (val) {
      this.showAdmin = false;
      if (val.indexOf("Admin") >= 0) this.showAdmin = true;
    },
  },
  methods: {
    ...mapActions(["initialize"]),
    login() {
      this.$auth.loginWithRedirect();
    },
    nav: function (location) {
      router.push(location);
      console.log(location);
    },
    toggleHeader: function () {
      this.headerShow = !this.headerShow;
    },
    toggleMenu: function () {
      this.menuShow = !this.menuShow;
    },
    signOut: function () {
      window.location = LOGOUT_URL;
    },
  },
};
</script>

<template>
  <v-app>
    <v-navigation-drawer
      v-bind:app="hasSidebar"
      permanent
      :expand-on-hover="hasSidebarClosable"
      clipped
      color="#f1f1f1"
      v-bind:class="{ 'd-none': !hasSidebar }"
    >
      <v-list dense nav style="" class="mt-4">
        <v-list-item
          link
          nav
          v-bind:title="section.name"
          v-bind:to="section.url"
          v-for="section in sections"
          v-bind:key="section.name"
        >
          <v-list-item-icon>
            <v-icon>{{ section.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ section.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#fff" flat height="70" style="left: 0; border-bottom: 3px #f3b228 solid">
      <img src="/yukon.svg" style="margin: -8px 85px 0 0" height="44" />
      <v-toolbar-title>
        <span style="font-weight: 700">{{ applicationName }}</span>

        <v-progress-circular
          :class="loadingClass"
          indeterminate
          color="#f3b228"
          size="20"
          width="2"
          class="ml-4"
        ></v-progress-circular>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div>
        <v-btn color="primary" text class="mr-1" to="/dashboard"><v-icon>mdi-home</v-icon></v-btn>
        <v-divider class="mr-5" vertical inset></v-divider>

        <v-btn v-if="!$auth.isAuthenticated" @click="login" color="primary">
          Sign In
        </v-btn>
        <span v-else>{{ username }}</span>
        <!-- TODO Remove this before production -->
        <!-- <span class="pl-3" @click="toggleAdmin()">
          <v-chip v-if="user.admin" color="yg_moss" dark>
            Admin
          </v-chip>
          <v-chip v-else color="yg_twilight" dark>
            User
          </v-chip>
        </span> -->
        <!-- End TODO Remove this before production -->
        <v-menu offset-y class="ml-0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="primary" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list dense style="min-width: 200px">
            <v-list-item to="/rooms">
              <v-list-item-icon>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Rooms</v-list-item-title>
            </v-list-item>
            <v-list-item to="/assets">
              <v-list-item-icon>
                <v-icon>mdi-clipboard-list-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Assets</v-list-item-title>
            </v-list-item>
            <v-list-item to="/personnel">
              <v-list-item-icon>
                <v-icon>mdi-account-multiple-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Personnel</v-list-item-title>
            </v-list-item>
            <v-list-item to="/keys">
              <v-list-item-icon>
                <v-icon>mdi-key-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Keys</v-list-item-title>
            </v-list-item>
            <v-divider />
            <div v-if="$auth.isAuthenticated">
              <v-list-item to="/profile">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>My profile</v-list-item-title>
              </v-list-item>
              <v-list-item to="/administration" v-if="isAdmin">
                <v-list-item-icon>
                  <v-icon>mdi-cogs</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Administration</v-list-item-title>
              </v-list-item>
              <v-divider />

              <v-list-item @click="$auth.logout({ returnTo })">
                <v-list-item-icon>
                  <v-icon>mdi-exit-run</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Sign out</v-list-item-title>
              </v-list-item>
            </div>
            <v-list-item v-else @click="login()">
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sign in</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main v-bind:style="{ 'padding-left: 33px !important': !hasSidebar }">
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="page-wrapper">
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-overlay v-model="showOverlay">
      <div class="text-center">
        <v-progress-circular indeterminate size="64" class="mb-5"></v-progress-circular>
        <h1 class="title">Loading ECO Assets Applicaiton</h1>
      </div>
    </v-overlay>
  </v-app>
</template>

<script>
import router from "@/router";
// import store from "./store";

import { mapActions, mapState, mapGetters } from "vuex";
import * as config from "@/config";
import { LOGOUT_URL } from "@/urls";
//import { getInstance } from "@/auth/auth0-plugin";

export default {
  name: "Layout",
  data: () => ({
    dialog: false,
    drawer: null,
    drawerRight: null,
    headerShow: false,
    menuShow: false,
    loadingClass: "d-none",
    applicationName: config.applicationName,
    applicationIcon: config.applicationIcon,
    sections: [],
    hasSidebar: false, //config.hasSidebar,
    hasSidebarClosable: config.hasSidebarClosable,
    search: "",
    showAdmin: true
  }),
  computed: {
    ...mapState("administration/users", ["user"]),
    ...mapGetters("administration/users", ["isAdmin"]),
    showOverlay: function() {
      return this.$auth.isLoading;
    },
    username() {
      // return this.user.username;
      if (this.$auth.isAuthenticated) {
        return this.$auth.user.name;
      }
      return "Not Authenticated";
    },

    returnTo: function() {
      return config.applicationUrl;
    }
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
    roles: function(val) {
      this.showAdmin = false;
      if (val.indexOf("Admin") >= 0) this.showAdmin = true;
    }
  },
  methods: {
    ...mapActions(["initialize"]),
    login() {
      this.$auth.loginWithRedirect();
    },
    nav: function(location) {
      router.push(location);
      console.log(location);
    },
    toggleHeader: function() {
      this.headerShow = !this.headerShow;
    },
    toggleMenu: function() {
      this.menuShow = !this.menuShow;
    },
    signOut: function() {
      window.location = LOGOUT_URL;
    }
  }
};
</script>

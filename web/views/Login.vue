<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col
        cols="12"
        sm="4">
        <v-card class="elevation-12 text-center">
          <v-toolbar
            dark
            color="primary"
            flat>
            <v-toolbar-title>Assets</v-toolbar-title>
          </v-toolbar>
          <v-card-text> <v-btn :href="loginURL">Login</v-btn> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { LOGIN_URL } from "@/urls";
import { mapActions, mapState } from "pinia";
// import { useAuthStore } from "@/stores/AuthStore";
// import localLogin from "@/components/auth/localLogin"
export default {
  name: "LoginView",

  components: {
    // localLogin
  },
  data: () => ({
    loginURL: LOGIN_URL,
    environment: process.env.NODE_ENV,
  }),
  methods: {
    // ...mapActions(useAuthStore, ["initialize"]),
  },
  computed: {
    // ...mapState(useAuthStore, ["isAuthenticated", "isInitialized"]),
    showOverlay: function () {
      return !this.isInitialized;
    },
  },
  async mounted() {
    // console.log(" The user is authenticated, redirecting to home");
    // // await this.initialize();
    // if (this.isAuthenticated) {
    //   this.$router.push({ name: "Home" });
    // }
  },
};
</script>

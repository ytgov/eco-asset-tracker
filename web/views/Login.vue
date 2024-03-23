<template>
  <v-container
    fluid
    class="fill-height login-background">
    <v-row justify="center">
      <v-col sm="3">
        <v-card
          rounded="4"
          class="elevation-12 text-center no-border">
          <v-toolbar
            dark
            color="secondary"
            flat>
            <v-toolbar-title class="no-icon-space text-center">{{
              applicationName
            }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text> <v-btn @click="doLogin">Login</v-btn> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { LOGIN_URL } from "@/urls";
import { applicationName } from "@/config";

export default {
  name: "LoginView",

  components: {},
  data: () => ({
    loginURL: LOGIN_URL,
    applicationName: applicationName,
  }),
  methods: {
    doLogin: function () {
      this.$auth0.loginWithRedirect();
    },
  },
  computed: {
    showOverlay: function () {
      return !this.isInitialized;
    },
  },
  async mounted() {},
};
</script>

<style scoped>
.no-border {
  border: 0px !important;
}
.no-icon-space {
  margin-left: 0 !important;
}
.login-background {
  background: url("@/assets/images/kristina-delp-CoGyhon1Q1E-unsplash.jpg")
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
</style>

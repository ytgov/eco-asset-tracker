<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col sm="2">
        <v-card
          rounded="4"
          class="elevation-12 text-center">
          <v-toolbar
            dark
            color="secondary"
            flat>
            <v-toolbar-title>{{ applicationName }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text> <v-btn :href="loginURL">Login</v-btn> </v-card-text>
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
  methods: {},
  computed: {
    showOverlay: function () {
      return !this.isInitialized;
    },
  },
  async mounted() {},
};
</script>

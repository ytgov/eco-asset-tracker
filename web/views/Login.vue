<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col sm="4">
        <v-toolbar
          dark
          color="secondary"
          flat>
          <v-toolbar-title class="no-icon-space text-center">{{
            applicationName
          }}</v-toolbar-title>
        </v-toolbar>
        <v-card
          rounded="4"
          class="elevation-12 text-center">
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

<style scoped>
.no-icon-space {
  margin-left: 0 !important;
}
</style>

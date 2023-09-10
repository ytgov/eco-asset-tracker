<template>
  <nav-app-bar v-if="true" />

  <!-- <v-navigation-drawer></v-navigation-drawer> -->
  <!--
  <nav-drawer
    v-if="true"
  :drawer.sync="drawer" /> -->
  <!-- <active-call-alert /> -->
  <v-main>
    <active-call-alert class="pt-2"></active-call-alert>
    <router-view />
  </v-main>
</template>

<script>
import navAppBar from "./components/nav/navAppBar.vue";
import activeCallAlert from "@/modules/paging/components/alerts/activeCallAlert.vue";
export default {
  name: "DefaultLayout",
  components: {
    navAppBar,
    // navDrawer,
    activeCallAlert,
  },
};
</script>

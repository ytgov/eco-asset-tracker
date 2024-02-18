<template>
  <v-app>
    <v-overlay
      persistent
      :model-value="!isInitialized"
      class="align-center justify-center">
      <div class="text-center pt-15 my-10">
        <v-progress-circular
          indeterminate
          size="64"
          color="white" />
      </div>

      <h2 class="text-white text my-10">Loading Application...</h2>
    </v-overlay>

    <v-container fluid>
      <v-row>
        <v-col>
          <router-view />
        </v-col>
      </v-row>
    </v-container>
    <Notifications />
  </v-app>
</template>

<script>
// import { mapActions, mapState } from "pinia";
// import { useAuthStore } from "@/stores/AuthStore";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {},
  data: () => ({
    overlay: true,
    drawer: { show: false },
    isInitialized: true,
  }),

  computed: {
    // ...mapState(useAuthStore, ["isInitialized"]),
    // ...mapActions(["initializeApp"]),
    // isNotLogin() {
    //   if (this.$route.name != "Login") {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
  },
  async mounted() {
    await this.initialize();
  },
  async created() {
    // if (!this.isInitialized) {
    //   console.log("App.vue: App is not initialized");
    //   await this.initialize();
    // } else {
    //   console.log("App.vue: App is initialized");
    // }
  },

  methods: {
    ...mapActions(["initialize"]),
    doNothing: function () {
      return null;
    },
    // isNotLogin() {
    //   if (this.$route.name != "Login") {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
  },
};
</script>
<style>
@import "./assets/yk-style.css";
</style>

<template>
  <v-app>
    <!-- <v-overlay
        persistent
        :model-value="!isInitialized"
        class="align-center justify-center">
        <div class="text-center pt-15 my-10">
          <v-progress-circular
            indeterminate
            size="64"
            color="white"></v-progress-circular>
        </div>

        <h2 class="text-white text my-10">Loading Application...</h2>
      </v-overlay>
    </div> -->

    <!-- <div class="bg-white">Initialized: {{ isInitialized }}</div>
    <div class="bg-white">Authenticated: {{ isAuthenticated }}</div> -->
    <!-- <v-container
      ><v-row>
        <v-col> -->
    <v-btn @click="login"> Login! </v-btn>
    {{ user }}
    <!-- <router-view> </router-view> -->
    <!-- </v-col>
      </v-row>
    </v-container> -->
    <!-- <Notifications></Notifications> -->
  </v-app>
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
// import { auth0 } from "@/plugins/auth0";
import { computed } from "vue";

const auth0 = useAuth0();

async function login() {
  await auth0.loginWithRedirect().then(() => {
    if (auth0.isAuthenticated) {
      console.log("App.vue: User is authenticated");
      auth0.getAccessTokenSilently().then((token) => {
        console.log("token: " + token);
      });
    }
  });
}

const user = computed(() => auth0);
</script>

<script>
// import { mapActions, mapState } from "pinia";
// import { useAuthStore } from "@/stores/AuthStore";

export default {
  name: "App",
  components: {},
  data: () => ({
    overlay: true,
    drawer: { show: false },
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

  methods: {
    // ...mapActions(useAuthStore, ["initialize"]),
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
  async mounted() {},
  async created() {
    // if (!this.isInitialized) {
    //   console.log("App.vue: App is not initialized");
    //   await this.initialize();
    // } else {
    //   console.log("App.vue: App is initialized");
    // }
  },
};
</script>
<style>
@import "./assets/yk-style.css";

/* html {
  background: url(./assets/SOMETLogo1920x1080.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
} */
</style>

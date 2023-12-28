<template>
  <v-app>
    <v-overlay persistent :model-value="!isInitialized" class="align-center justify-center">
      <div class="text-center pt-15 my-10">
        <v-progress-circular indeterminate size="64" color="white" />
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

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
// import { auth0 } from "@/plugins/auth0";
import { onMounted } from "vue";

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

onMounted(async () => {

  if (!auth0.isAuthenticated) {
    await login();

  }
  console.log(auth0.isAuthenticated.value);
  console.log(auth0.user.value);
});

// const user = computed(() => auth0);
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
  async mounted() { },
  async created() {
    // if (!this.isInitialized) {
    //   console.log("App.vue: App is not initialized");
    //   await this.initialize();
    // } else {
    //   console.log("App.vue: App is initialized");
    // }
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

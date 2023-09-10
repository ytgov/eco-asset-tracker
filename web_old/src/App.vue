<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {},
  methods: {
    ...mapActions(["initialize"]),
    ...mapActions("administration/users", ["getCurrentUser"]),
  },
  watch: {
    isLoading: async function() {
      if (!this.isLoading) {
        await this.initialize();
      }
      if (this.$auth.isAuthenticated) {
        this.getCurrentUser();
      }
    },
  },
  computed: {
    isLoading() {
      return this.$auth.isLoading;
    },
  },
  async created() {},
  async mounted() {
    // await this.initialize();
  },
};
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "App",
  components: {},
  methods: {
    ...mapActions(["initialize"])
  },
  computed: {
    ...mapState("rooms", ["rooms"]),
    ...mapState("assets", ["assets"])
  },
  async created() {
    console.log("Initializing...");
    await this.initialize();
  }
};
</script>

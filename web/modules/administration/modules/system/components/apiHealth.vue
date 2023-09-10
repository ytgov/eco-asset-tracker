<template>
  <div>
    <v-row dense>
      <v-col cols="6">
        <v-row align="center">
          <v-col cols="1">
            <v-icon :color="health.color">
              {{ health.icon }}
            </v-icon>
          </v-col>
          <v-col cols="3">
            {{ api.name }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ApiHealth",
  props: {
    api: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  components: {},
  data: () => ({
    //
  }),
  created() {},
  methods: {},
  computed: {
    health() {
      switch (this.api.status.toUpperCase()) {
        case "OK":
          return { color: "success", icon: "mdi-check-circle" };
        case "WARNING":
          return { color: "warning", icon: "mdi-alert" };
        case "ERROR":
          return { color: "error", icon: "mdi-alert-octagon" };
        default:
          return { color: "grey", icon: "mdi-help-circle" };
      }
    },
  },
};
</script>

<style></style>

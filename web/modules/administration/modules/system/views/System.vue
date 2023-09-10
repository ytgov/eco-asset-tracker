<template>
  <div>
    <h1>
      System Information and actions
    </h1>
    <v-card>
      <v-card-title>Connected API Status</v-card-title>
      <v-card-text>
        <api-health :api="api1"></api-health>
        <api-health :api="api2"></api-health>
        <api-health :api="api3"></api-health>
        <api-health :api="api4"></api-health>
      </v-card-text>
    </v-card>
    <notifications ref="notifier"></notifications>
  </div>
</template>

<script>
import apiHealth from "../components/apiHealth.vue";
export default {
  name: "System",
  components: {
    apiHealth,
  },
  data: () => ({
    api1: {
      name: "API 1",
      url: "http://localhost:3000",
      status: "OK",
      lastChecked: "2020-01-01 12:00:00",
    },
    api2: {
      name: "API 2",
      url: "http://localhost:3000",
      status: "WARNING",
      lastChecked: "2020-01-01 12:00:00",
    },
    api3: {
      name: "API 3",
      url: "http://localhost:3000",
      status: "ERROR",
      lastChecked: "2020-01-01 12:00:00",
    },
    api4: {
      name: "Default",
      url: "http://localhost:3000",
      status: "UNKNOWN",
      lastChecked: "2020-01-01 12:00:00",
    },
    //
  }),
  created() {},
  methods: {},
};
</script>

<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    >
      <template v-slot:right>
        <!-- <timed-message ref="messager" class="mr-4"></timed-message> -->
      </template>
    </BaseBreadcrumb>

    <v-tabs optional v-model="currentTab">
      <v-tab to="/administration/users">Users</v-tab>

      <v-tab to="/administration/asset-types">Lookup Tables </v-tab>
      <v-tab to="/administration/system">System</v-tab>
    </v-tabs>

    <router-view></router-view>
    <!-- <div class="row">
      <div class="col-md-4">
        <v-card class="mt-5 default">
          <healthCheck></healthCheck>
        </v-card>
      </div>
      <div class="col-md-4">
        <v-card class="mt-5 default">
          <seed-data></seed-data>

        </v-card>
      </div>
    </div> -->

    <notifications ref="notifier"></notifications>
  </v-container>
</template>

<script>
// import healthCheck from "../components/health/healthCheck.vue";
// import SeedData from "../components/seed/seedData.vue";

export default {
  name: "Home",
  components: {
    // healthCheck,
    // SeedData,
  },
  data: () => ({
    items: [
      { title: "Users", to: "/administration/users" },
      { title: "Lookup Tables", to: "/administration/lookupTables" },
      { title: "System", to: "/administration/system" },
    ],
    currentTab: "",
    page: { title: "Administration" },
  }),
  created() {},
  computed: {
    breadcrumbs: function() {
      return [
        { text: "Home", to: "/dashboard", exact: true },
        { text: "Administration" },
      ];
    },
  },
  methods: {},
  mounted() {},
};
</script>

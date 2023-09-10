<template>
  <v-container fluid>
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    >
      <template v-slot:right>
        <!-- <timed-message ref="messager" class="mr-4"></timed-message> -->
      </template>
    </BaseBreadcrumb>
    <BaseCard showHeader="true">
      <template v-slot:left>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </template>

      <template v-slot:right>
        <add-asset-btn all v-if="isAdmin"></add-asset-btn>
      </template>

      <v-card>
        <assets-grid all :search="search"></assets-grid>
        <notifications ref="notifier"></notifications>
      </v-card>
    </BaseCard>
  </v-container>
</template>

<script>
import AssetsGrid from "../components/assetsGrid.vue";
import AddAssetBtn from "../components/addAssetBtn.vue";
import { mapGetters } from "vuex";

export default {
  name: "",
  components: {
    AssetsGrid,
    AddAssetBtn
  },
  data: () => ({
    search: "",
    page: {
      title: "Assets"
    },
    dialog: false
  }),
  created() {},
  computed: {
    ...mapGetters("administration/users", ["isAdmin"]),
    breadcrumbs: function() {
      return [
        { text: "Home", to: "/dashboard", exact: true },
        { text: "Assets" }
      ];
    }
  },
  methods: {
    closeRoomDetails() {
      this.dialog = false;
    }
  }
};
</script>

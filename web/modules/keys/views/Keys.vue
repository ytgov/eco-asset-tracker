<template>
  <v-container fluid>
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs">
      <template #right>
        <!-- <timed-message ref="messager" class="mr-4"></timed-message> -->
      </template>
    </BaseBreadcrumb>

    <BaseCard show-header="true">
      <template #left>
        <data-table-search-bar v-model="search" />
      </template>
      <template #right>
        <add-key-btn v-if="isAdmin" />
      </template>

      <v-card>
        <keys-table
          :all="true"
          :search="search" />
      </v-card>
    </BaseCard>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import AddKeyBtn from "../components/addKeyBtn.vue";
import KeysTable from "../components/keysTable.vue";

export default {
  name: "KeysPage",
  components: {
    KeysTable,
    AddKeyBtn,
  },
  data: () => ({
    search: "",
    page: {
      title: "Keys",
    },
    dialog: false,
  }),
  computed: {
    ...mapGetters("administration/users", ["isAdmin"]),
    isAdmin: function () {
      return true;
    },
    breadcrumbs: function () {
      return [
        { title: "Home", href: "/dashboard", exact: true },
        { title: "Keys" },
      ];
    },
  },
  created() {},
  methods: {
    closeRoomDetails() {
      this.dialog = false;
    },
  },
};
</script>
<style></style>

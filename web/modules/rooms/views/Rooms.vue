<template>
  <v-container fluid>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs">
      <template v-slot:right>
        <!-- <timed-message ref="messager" class="mr-4"></timed-message> -->
      </template>
    </BaseBreadcrumb>

    <BaseCard showHeader="true">
      <template v-slot:left>
        <data-table-search-bar v-model="search"> </data-table-search-bar>
      </template>
      <template v-slot:right>
        <add-room-btn v-if="isAdmin"></add-room-btn>
      </template>

      <v-card>
        <room-table :search="search"></room-table>
      </v-card>
    </BaseCard>
  </v-container>
</template>

<script>
import RoomTable from "../components/roomTable.vue";
import AddRoomBtn from "../components/addRoomBtn.vue";
import { mapGetters } from "vuex";

export default {
  name: "RoomsView",
  components: {
    RoomTable,
    AddRoomBtn,
  },
  data: () => ({
    search: "",
    page: {
      title: "Rooms",
    },
    dialog: false,
  }),
  created() { },
  computed: {
    breadcrumbs: function () {
      return [
        { title: "Home", to: "/dashboard", exact: true },
        { title: "Rooms" },
      ];
    },
    ...mapGetters("administration/users", ["isAdmin"]),
  },
  methods: {
    closeRoomDetails() {
      this.dialog = false;
    },
  },
};
</script>

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
          prepend-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          clearable
        ></v-text-field>
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
  name: "",
  components: {
    RoomTable,
    AddRoomBtn
  },
  data: () => ({
    search: "",
    page: {
      title: "Rooms"
    },
    dialog: false
  }),
  created() {},
  computed: {
    breadcrumbs: function() {
      return [
        { text: "Home", to: "/dashboard", exact: true },
        { text: "Rooms" }
      ];
    },
    ...mapGetters("administration/users", ["isAdmin"])
  },
  methods: {
    closeRoomDetails() {
      this.dialog = false;
    }
  }
};
</script>

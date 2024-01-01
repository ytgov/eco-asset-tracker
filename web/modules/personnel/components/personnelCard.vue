<template>
  <div>
    <v-toolbar
      dark
      color="yg_moss">
      <v-toolbar-title> Personnel </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <link-personnel-room-dialog v-if="isEditor"></link-personnel-room-dialog
      ></v-btn>
    </v-toolbar>
    <v-card rounded="0">
      <!-- <v-card-text> -->
      <personnel-table
        :items="assignedPeopletoRooms"
        :isLoading="loading">
      </personnel-table>
      <!-- </v-card-text> -->
    </v-card>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import linkPersonnelRoomDialog from "./linkPersonnelRoom/linkPersonnelRoomDialog.vue";
import PersonnelTable from "./personnelTable.vue";

export default {
  name: "personelCard",
  components: {
    linkPersonnelRoomDialog,
    PersonnelTable,
  },
  props: {
    search: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    // formAItems: [],
    // loadingFormA: false,
    loading: true,
    dialog: false,
    people: [],
  }),
  computed: {
    roomID: function () {
      return this.$route.params.roomID;
    },
    ...mapState("rooms", ["currentRoom", "assignedPeopletoRooms"]),
    ...mapGetters("rooms", ["assignedPersonnel"]),
    ...mapGetters("administration/users", ["isEditor"]),
    // ...mapGetters("rooms", ["assignedPersonnel"]),
    headers: function () {
      return [
        { text: "Name", value: "name" },
        { text: "Purpose", value: "purpose" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" },
      ];
      // return Object.keys(this.rooms)
    },
  },
  mounted: async function () {
    this.loading = true;
    // this.people = await this.getAssignedPersonnel(this.roomID);
    await this.getAssignedPersonnel(this.roomID);
    this.loading = false;
  },
  methods: {
    ...mapActions("rooms", ["getAssignedPersonnel"]),
  },
};
</script>

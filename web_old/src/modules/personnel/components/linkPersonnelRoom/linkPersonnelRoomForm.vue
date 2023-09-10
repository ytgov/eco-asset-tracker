<template>
  <v-container>
    <!-- <link-asset-assigned-dialog
      :warn="warn"
      :asset="currentAsset"
      :room="currentRoom"
      @accept="doOverwrite()"
      @cancel="warn = false"
    >
    </link-asset-assigned-dialog> -->
    <v-text-field
      class="pb-10 "
      v-model="search"
      prepend-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      clearable
    ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="employees"
      :search="search"
      :loading="loading"
    >
      <template v-slot:item.personnel="{ item }">
        <v-simple-checkbox
          :value="isAssigned(item.ynet_id)"
          @click="doAssignPerson(item)"
        >
        </v-simple-checkbox>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import linkPersonnelRoomDialog from "./linkPersonnelRoomDialog.vue";
export default {
  name: "linkPersonnelRoomForm",
  components: {},
  props: {},
  data: () => ({
    search: "",
    loading: true,
    message: "",
    assignments: {
      room: "",
      people: [],
    }, //the running list of who is assinged to this room
    overwrite: false,
    warn: false,
  }),
  computed: {
    ...mapState("personnel", ["employees", "currentPersonnel"]),
    ...mapState("rooms", ["currentRoom", "assignedPeopletoRooms"]),
    headers: function() {
      return [
        { text: ``, value: "personnel" },
        { text: "Name", value: "display_name" },
        { text: "Email", value: "email" },
        { text: "Title", value: "title" },
      ];
    },
  },
  methods: {
    cleanAssignments(personnelAssignments) {
      let y = {
        room: this.currentRoom._id,
        people: personnelAssignments.map((x) => {
          return x.ynet_id;
        }),
      };
      return y;
    },
    ...mapActions("rooms", ["getAssignedPersonnel", "assignPeopletoRooms"]),
    isAssigned: function(person) {
      if (this.assignments.people.findIndex((p) => p === person) > -1) {
        return true;
      }
      return false;
    },
    openAssetDetails: function(item) {
      this.$router.push("/assets/" + item._id);
    },
    doOverwrite: async function() {
      await this.assignRoom(this.currentRoom._id);
      this.warn = false;
    },
    doAssignPerson: async function(item) {
      if (this.isAssigned(item.ynet_id)) {
        let newList = this.assignments.people.filter((p) => p != item.ynet_id);

        this.assignments.people = newList;
      } else {
        this.assignments.people.push(item.ynet_id);
      }
      this.assignPeopletoRooms(this.assignments);
    },
  },
  async mounted() {
    // this.loading = true;
    await this.getAssignedPersonnel();
    this.assignments = await this.cleanAssignments(
      this.currentRoom.assignedPersonnel
    );
    this.loading = false;
  },
};
</script>

<style></style>

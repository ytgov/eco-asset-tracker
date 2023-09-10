<template>
  <v-container>
    <v-text-field
      v-show="edit"
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
      :items="rooms"
      :search="search"
      :loading="loading"
    >
      <template v-slot:item.assigned="{ item }">
        <!-- {{ item.room_id }} -->
        <v-simple-checkbox
          @click="doAssignRoom(item)"
          :value="isAssigned(item._id)"
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
  name: "linkRoomForm",
  components: {},
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    search: "",
    loading: true,
    message: "",
    assignments: {
      key: "",
      rooms: [],
    }, //the running list of who is assigned to this room
    overwrite: false,
    warn: false,
  }),
  computed: {
    ...mapState("keys", ["currentKey", "assignedRooms"]),
    ...mapState("rooms", ["rooms"]),
    headers: function() {
      return [
        { text: "", value: "assigned" },
        { text: "Room", value: "name" },
        { text: "Type", value: "purpose" },
      ];
    },
    keyID: function() {
      return this.$route.params.keyID;
    },
  },
  methods: {
    ...mapActions("keys", ["assignRoomsToKey"]),
    goToRoom(roomID) {
      this.$router.push({ name: "room", params: { roomID: roomID } });
    },
    cleanAssignments(roomAssignments) {
      let y = {
        key: this.keyID,
        rooms: roomAssignments.map((x) => {
          return x.room_id;
        }),
      };
      return y;
    },
    // ...mapActions("keys", ["getAssignedRoomKeys"]),
    isAssigned: function(room) {
      if (this.assignments.rooms.findIndex((p) => p === room) > -1) {
        return true;
      }
      return false;
    },
    doAssignRoom: async function(item) {
      if (this.isAssigned(item._id)) {
        let newList = this.assignments.rooms.filter((p) => p != item._id);

        this.assignments.rooms = newList;
      } else {
        this.assignments.rooms.push(item._id);
      }

      this.assignRoomsToKey(this.assignments);
    },
  },
  async mounted() {
    this.assignments = await this.cleanAssignments(this.assignedRooms);
    this.loading = false;
  },
};
</script>

<style></style>

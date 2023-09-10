<template>
  <v-container>
    <div class="text-center" v-if="updating">
      <div class="font-italic text-subtitle-1 pb-10">
        Updating...
      </div>
      <div>
        <v-progress-circular
          align-center
          v-if="updating"
          :indeterminate="updating"
          color="primary"
          height="5"
        />
      </div>
    </div>
    <v-simple-table v-if="!updating">
      <tbody>
        <tr
          v-for="room in assignedRooms"
          :key="room.index"
          @click="goToRoom(room.room_id)"
        >
          <td class="text-body-2">{{ room.name }}</td>
          <td class="text-body-2">{{ room.purpose }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <div class="text-center">
      <assign-room-btn v-if="edit && assignedRooms.length === 0 && !updating" />
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AssignRoomBtn from "./assignRoomBtn.vue";
export default {
  name: "linkedRoomsSimpleTable",
  components: { AssignRoomBtn },
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
    ...mapState("keys", ["currentKey", "assignedRooms", "updating"]),
    headers: function() {
      return [
        { text: "Name", value: "name" },
        { text: "Type", value: "Purpose" },
      ];
    },
    keyID: function() {
      return this.$route.params.keyID;
    },
  },
  methods: {
    goToRoom(roomID) {
      this.$router.push({ name: "room", params: { roomID: roomID } });
    },
  },
  async mounted() {},
};
</script>

<style></style>

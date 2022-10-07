<template>
  <v-container fluid>
    <!-- <v-row
      justify="end"
      v-if="isAdmin">

      <v-col
        cols=1
        class=""
      >
        <add-room-btn
          @close="closeRoomDetails">
        </add-room-btn>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          dense
          :search="search"
          :items="rooms"
          :loading="loadingRooms"
          @click:row="openRoomDetails"
        >
          <template v-slot:item.name="{ item }">
            <!-- <v-icon>
              mdi-delete
            </v-icon>
            <v-icon>
              mdi-pencil
            </v-icon> -->
            {{ item.name }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
// import AddRoomBtn from "./addRoomBtn.vue";

export default {
  // components: { createFormAButton },
  name: "RoomTable",
  components: {
    // AddRoomBtn,
    // departmentFormASummary,
  },
  props: {
    search: {
      type: String,
      default: ""
    }
  },

  data: () => ({
    // formAItems: [],
    // loadingFormA: false,
    loadingRooms: true,
    dialog: false
  }),
  computed: {
    ...mapState("administration/users", ["user"]),

    isAdmin: function() {
      return this.user.admin;
    },
    ...mapState("rooms", ["rooms"]),
    headers: function() {
      return [
        { text: "Name", value: "name" },
        { text: "Purpose", value: "purpose" },
        { text: "Status", value: "status" }
      ];
      // return Object.keys(this.rooms)
    }
  },
  mounted: async function() {
    this.loadingRooms = false;
    // this.formAItems = await this.getDepartmentFormAList(
    //   this.$route.params.departmentId
    // );
    // this.loadingFormA = false;
  },
  methods: {
    ...mapActions("rooms", ["getAllRooms", "getRoom"]),

    openRoomDetails(item) {
      this.$router.push("/rooms/" + item._id);
    },
    closeRoomDetails() {
      this.dialog = false;
    }
  }
};
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table dense :headers="headers" :search="search" :items="rooms" :loading="loadingRooms"
          @click:row="openRoomDetails" @current-items="currentItems">
          <template v-slot:item.name="{ item }">
            <!-- <v-icon>
              mdi-delete
            </v-icon>
            <v-icon>
              mdi-pencil
            </v-icon> -->
            {{ item.name }}
          </template>
          <template v-slot:footer.prepend>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <download-csv :data="filteredRooms" :labels="headers" name="rooms.csv">
                  <v-chip label variant=outlined v-bind="props">
                    <v-icon>
                      mdi-download
                    </v-icon>
                  </v-chip>
                </download-csv>
                <v-spacer />
              </template>
              <span>Download CSV</span>
            </v-tooltip>
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
      default: "",
    },
  },

  data: () => ({
    // formAItems: [],
    // loadingFormA: false,
    loadingRooms: true,
    dialog: false,
    filteredRooms: [],
  }),
  computed: {
    ...mapState("administration/users", ["user"]),

    isAdmin: function () {
      return this.user.admin;
    },
    ...mapState("rooms", ["rooms"]),
    headers: function () {
      return [
        { text: "Name", value: "name" },
        { text: "Purpose", value: "purpose" },
        { text: "Status", value: "status" },
      ];
      // return Object.keys(this.rooms)
    },
  },
  mounted: async function () {
    this.loadingRooms = false;
    // this.formAItems = await this.getDepartmentFormAList(
    //   this.$route.params.departmentId
    // );
    // this.loadingFormA = false;
  },
  methods: {
    currentItems: function (value) {
      this.filteredRooms = value;
    },
    ...mapActions("rooms", ["getAllRooms", "getRoom"]),

    openRoomDetails(item) {
      this.$router.push("/rooms/" + item._id);
    },
    closeRoomDetails() {
      this.dialog = false;
    },
  },
};
</script>

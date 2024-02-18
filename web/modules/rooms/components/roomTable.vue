<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table-virtual
          dense
          :headers="headers"
          :search="search"
          :items="rooms"
          :loading="loadingRooms"
          @click:row="openRoomDetails">
          <template v-slot:item.name="{ item }">
            <!-- <v-icon>
              mdi-delete
            </v-icon>
            <v-icon>
              mdi-pencil
            </v-icon> -->
            {{ item.name }}
          </template>
          <!-- <template v-slot:bottom>
            <v-tooltip location="top">
              <v-spacer />
              <span>Download CSV</span>
            </v-tooltip>
          </template> -->
        </v-data-table-virtual>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="text-right">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <download-csv
                class="mt-3"
                :data="rooms"
                :labels="headers"
                name="rooms.csv">
                <v-chip
                  label
                  variant="outlined"
                  v-bind="props">
                  <v-icon> mdi-download </v-icon>
                </v-chip>
              </download-csv>
            </template>
            <span>Download CSV</span>
          </v-tooltip>
        </div>
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
    filteredThings: function () {
      return this.rooms.filter((room) => {
        return room.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    isAdmin: function () {
      return this.user.admin;
    },
    ...mapState("rooms", ["rooms"]),
    headers: function () {
      return [
        { title: "Name", value: "name" },
        { title: "Purpose", value: "purpose" },
        { title: "Status", value: "status" },
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

    openRoomDetails(event, dataTableRow) {
      const { item } = dataTableRow;
      this.$router.push("/rooms/" + item._id);
    },
    closeRoomDetails() {
      this.dialog = false;
    },
  },
};
</script>

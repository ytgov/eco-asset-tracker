<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table :headers="localHeaders" :items="dataset" :search="search" :loading="loading"
          @click:row="openKeyDetails" @current-items="currentItems">
          <template v-slot:item.room="{ item }">
            <span v-if="item.room">
              {{ roomName(item.room) }}
            </span>
          </template>

          <template v-slot:footer.prepend>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <download-csv :data="filteredKeys" :labels="headers" name="keys.csv">
                  <v-chip label variant="outlined" v-bind="props">
                    <v-icon>
                      mdi-download
                    </v-icon>
                  </v-chip>
                </download-csv>
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
import { mapState } from "vuex";

export default {
  name: "KeyTable",
  components: {},
  props: {
    search: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
    },
    all: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
    },
  },
  data: () => ({
    loading: true,
    filteredKeys: [],
  }),

  computed: {
    ...mapState("administration/users", ["user"]),
    ...mapState("rooms", ["rooms"]),
    ...mapState("keys", ["keys"]),
    dataset: function () {
      if (this.all) {
        return this.keys;
      } else {
        return this.items;
      }
    },

    isAdmin: function () {
      return this.user.admin;
    },

    localHeaders: function () {
      if (this.headers) {
        return this.headers;
      } else {
        return [
          { text: "Key Code", value: "code" },
          { text: "Key Number", value: "number" },
          { text: "Status", value: "status" },
          { text: "Assigned to", value: "assignedTo" },
          { text: "Room", value: "room" },
          { text: "Notes", value: "notes" },
        ];
      }
    },
  },
  methods: {
    currentItems: function (value) {
      this.filteredKeys = value;
    },
    openKeyDetails: function (item) {
      // alert("Asset detail goes here!");
      this.$router.push("/keys/" + item._id);
    },
    roomName: function (roomID) {
      //find the room in the list of rooms and return the name of the room matching roomID
      if (roomID && this.rooms.length > 0) {
        return this.rooms.find((room) => room._id == roomID).name;
      }
      return "";
    },
  },

  async mounted() {
    this.loading = false;
  },
};
</script>

<style></style>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          :headers="localHeaders"
          :items="localItems"
          :search="search"
          :loading="localLoading"
          @click:row="openAssetDetails"
          @update:currentItems="currentItems">
          <template v-slot:item.room="{ item }">
            <span v-if="item.room">
              {{ roomName(item.room) }}
            </span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="text-right">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <download-csv
                :data="downloadCSVData"
                :labels="headers"
                name="assets.csv">
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
import { filterData } from "@/mixins/dataTableCurrenItems";

// import AddAssetBtn from './addAssetBtn.vue'

export default {
  name: "AssetsGrid",
  components: {
    // AddAssetBtn
  },
  mixins: [filterData], // mixin to surface the visible data on a datatable
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
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    filteredAssets: [],
  }),

  computed: {
    downloadData() {
      return this.filteredItems.length > 0
        ? this.filteredItems
        : this.localItems;
    },
    localLoading: function () {
      if (this.items) {
        return this.loading;
      } else if (this.all) {
        return false;
      }
      return false;
    },
    ...mapState("administration/users", ["user"]),
    ...mapState("rooms", ["rooms"]),
    ...mapState("assets", ["assets"]),
    localItems: function () {
      if (this.all) {
        return this.assets;
      } else {
        return this.items;
      }
    },

    isAdmin: function () {
      return this.user.admin;
    },

    localHeaders: function () {
      if (this.headers.length > 0) {
        return this.headers;
      } else {
        return [
          { title: "Asset", value: "assetNum" },
          { title: "Type", value: "type" },
          { title: "Description", value: "description" },
          // { text: "Room", value: "room" },
          { title: "Status", value: "status" },
          { title: "Purchased", value: "purchaseDate" },
          { title: "Installed", value: "installDate" },
        ];
      }
    },
  },
  methods: {
    currentItems: function (value) {
      console.log(value);
      this.filteredAssets = value;
    },
    ...mapActions("assets", ["getAllAssets"]),
    openRoomDetails(event, dataTableRow) {
      const { item } = dataTableRow;
      this.$router.push("/rooms/" + item._id);
    },
    openAssetDetails: function (event, dataTableRow) {
      // alert("Asset detail goes here!");
      const { item } = dataTableRow;
      this.$router.push("/assets/" + item._id);
    },
    roomName: function (roomID) {
      //find the room in the list of rooms and return the name of the room matching roomID
      if (roomID && this.rooms.length > 0) {
        return this.rooms.find((room) => room._id == roomID).name;
      }
      return "";
    },
  },

  async mounted() {},
};
</script>

<style></style>

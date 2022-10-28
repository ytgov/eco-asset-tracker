<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          :headers="localHeaders"
          :items="dataset"
          :search="search"
          :loading="loading"
          @click:row="openAssetDetails"
          @current-items="currentItems"
        >
          <template v-slot:item.room="{ item }">
            <span v-if="item.room">
              <!-- {{item.room}} -->
              {{ roomName(item.room) }}
            </span>
          </template>
          <template v-slot:footer.prepend>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <download-csv
                  :data="filteredAssets"
                  :labels="headers"
                  name="assets.csv"
                >
                  <v-chip label outlined v-on="on" v-bind="attrs">
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
import { mapActions, mapState } from "vuex";
// import AddAssetBtn from './addAssetBtn.vue'

export default {
  name: "AssetsGrid",
  components: {
    // AddAssetBtn
  },
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
  },
  data: () => ({
    loading: true,
    filteredAssets: [],
  }),

  computed: {
    ...mapState("administration/users", ["user"]),
    ...mapState("rooms", ["rooms"]),
    ...mapState("assets", ["assets"]),
    dataset: function() {
      if (this.all) {
        return this.assets;
      } else {
        return this.items;
      }
    },

    isAdmin: function() {
      return this.user.admin;
    },

    localHeaders: function() {
      if (this.headers.length > 0) {
        return this.headers;
      } else {
        return [
          { text: "Asset", value: "assetNum" },
          { text: "Type", value: "type" },
          { text: "Description", value: "description" },
          // { text: "Room", value: "room" },
          { text: "Status", value: "status" },
          { text: "Purchased", value: "purchaseDate" },
          { text: "Installed", value: "installDate" },
        ];
      }
    },
  },
  methods: {
    currentItems: function(value) {
      this.filteredAssets = value;
    },
    ...mapActions("assets", ["getAllAssets"]),
    openAssetDetails: function(item) {
      // alert("Asset detail goes here!");
      this.$router.push("/assets/" + item._id);
    },
    roomName: function(roomID) {
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

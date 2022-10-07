<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="dataset"
          :search="search"
          :loading="loading"
          @click:row="openAssetDetails"
        >
          <template v-slot:item.room="{ item }">
            <span v-if="item.room">
              <!-- {{item.room}} -->
              {{ roomName(item.room) }}
            </span>
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
      default: ""
    },
    items: {
      type: Array
    },
    all: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: true
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

    headers: function() {
      return [
        { text: "Asset", value: "assetNum" },
        { text: "Type", value: "type" },
        { text: "Description", value: "description" },
        { text: "Room", value: "room" },
        { text: "Status", value: "status" },
        { text: "Purchased", value: "purchaseDate" },
        { text: "Installed", value: "installDate" }
      ];
    }
  },
  methods: {
    ...mapActions("assets", ["getAllAssets"]),
    openAssetDetails: function(item) {
      // alert("Asset detail goes here!");
      this.$router.push("/assets/" + item._id);
    },
    roomName: function(roomID) {
      //find the room in the list of rooms and return the name of the room matching roomID
      if (roomID && this.rooms.length > 0) {
        return this.rooms.find(room => room._id == roomID).name;
      }
      return "";
    }
  },

  async mounted() {
    this.loading = false;
  }
};
</script>

<style></style>

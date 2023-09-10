<template>
  <v-container>
    <link-asset-assigned-dialog
      :warn="warn"
      :asset="currentAsset"
      :room="currentRoom"
      @accept="doOverwrite()"
      @cancel="warn = false"
    >
    </link-asset-assigned-dialog>
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
      :items="assets"
      :search="search"
      :loading="loading"
    >
      <template v-slot:item.room="{ item }">
        <v-simple-checkbox
          :value="isAssigned(item.room)"
          @click="doAssignRoom(item)"
        >
        </v-simple-checkbox>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import linkAssetAssignedDialog from "./linkAssetAssignedDialog.vue";
export default {
  name: "LinkAssetFrom",
  components: {
    linkAssetAssignedDialog
  },
  props: {},
  data: () => ({
    search: "",
    loading: true,
    message: "",
    overwrite: false,
    warn: false
  }),
  computed: {
    ...mapGetters("assets", ["getAssetsByRoom"]),
    ...mapState("assets", ["assets", "currentAsset"]),
    ...mapState("rooms", ["currentRoom"]),
    headers: function() {
      return [
        { text: ``, value: "room" },
        { text: "Asset", value: "assetNum" },
        { text: "Type", value: "type" },
        { text: "Description", value: "description" },
        { text: "Status", value: "status" }
      ];
    }
  },
  methods: {
    ...mapActions("assets", ["assignRoom", "getAsset"]),
    isAssigned: function(room) {
      if (room == this.currentRoom._id) {
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
    doAssignRoom: async function(item) {
      // get the asset from the database and load it into the store
      await this.getAsset(item._id);
      //if the the room for the asset is empty then assign it to the current room
      if (!this.currentAsset.room) {
        await this.assignRoom(this.currentRoom._id);
      }
      //if the room is present but does match the current room as about overwriting the assignement to the current room
      else if (this.currentAsset.room != this.currentRoom._id) {
        this.warn = true;
      } // if none of the above ar true set the asset as unassigned to a room
      else await this.assignRoom(null);
    }
  },
  async mounted() {
    this.loading = false;
  }
};
</script>

<style></style>

<template>
  <span>
    <v-btn color="primary" dark @click="createNewAsset()">
      Add
    </v-btn>
    <v-dialog max-width="600" v-model="dialog">
      <v-toolbar dark :color="appbarColor">
        <v-toolbar-title>
          Add Asset
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon @click="close()">
          mdi-close
        </v-icon>
      </v-toolbar>
      <v-card tile>
        <v-card-text>
          <asset-detail-form :edit="true"></asset-detail-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="create()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import assetDetailForm from "./assetDetailForm.vue";
export default {
  name: "AddAssetBtn",
  components: {
    assetDetailForm
  },
  data: () => ({
    valid: false,
    dialog: false,
    rules: {
      required: value => !!value || "Required."
    },
    appbarColor: "yg_moss"
  }),
  computed: {
    ...mapState("rooms", ["rooms"]),
    ...mapState("assets", ["currentAsset"]),
    activeLabel: function() {
      if (this.asset.active == true) {
        return { text: "Active", color: "yg_moss" };
      } else {
        return { text: "Inactive", color: "red" };
      }
    }
  },
  methods: {
    ...mapActions("assets", ["createAsset", "clearAsset"]),
    ...mapMutations("assets", ["SET_ASSET"]),

    close: function() {
      this.dialog = false;
      this.SET_ASSET = {};
    },

    create: async function() {
      if (this.currentAsset.assetNum) {
        await this.createAsset(this.currentAsset);
        await this.clearAsset();
      } else {
        console.log(
          "An assetNumber is required in order to create a new asset"
        );
        console.log(this.asset);
      }

      this.close();
    },
    createNewAsset: async function() {
      await this.clearAsset();
      this.dialog = true;
    }
  },
  mounted: async function() {
    if (this.rooms.length == 0) {
      console.log("Initializing Rooms");
      await this.getAllRooms();
    }
  }
};
</script>

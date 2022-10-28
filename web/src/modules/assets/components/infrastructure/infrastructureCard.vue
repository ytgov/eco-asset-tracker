<template>
  <v-card tile>
    <v-toolbar>
      <v-toolbar-title>
        Infrastructure
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text>
      <assets-grid :headers="headers" :items="items"> </assets-grid>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import AssetsGrid from "../assetsGrid.vue";

export default {
  name: "RoomTable",
  components: { AssetsGrid },
  props: {
    search: {
      type: String,
      default: "",
    },
    roomID: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    // formAItems: [],
    // loadingFormA: false,
    loading: true,
    dialog: false,
  }),
  computed: {
    items: function() {
      return this.getAssetsByRoom(this.roomID).filter((asset) =>
        this.infrastructureTypes.includes(asset.type)
      );
    },
    ...mapGetters("administration/users", ["isAdmin"]),
    ...mapGetters("administration/assetTypes", ["infrastructureTypes"]),
    ...mapGetters("assets", ["getAssetsByRoom"]),
    headers: function() {
      return [
        { text: "Type", value: "type" },
        // { text: "Name", value: "name" },
        { text: "Description", value: "description" },
      ];
      // return Object.keys(this.rooms)
    },
  },
  mounted: async function() {
    this.loading = false;
  },
  methods: {},
};
</script>

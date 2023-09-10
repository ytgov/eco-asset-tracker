<template>
  <v-card tile>
    <v-toolbar>
      <v-toolbar-title>
        Assets
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <link-asset-dialog v-if="isAdmin">
        mdi-plus
      </link-asset-dialog>
    </v-toolbar>

    <v-card-text>
      <p>A list of assets assigned to the room {{ roomID }}</p>
      <assets-grid :items="items" :loading="loading"> </assets-grid>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import AssetsGrid from "./assetsGrid.vue";
import linkAssetDialog from "./linkAsset/linkAssetDialog.vue";

export default {
  name: "assetsCard",
  components: {
    AssetsGrid,
    linkAssetDialog,
  },
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
    loading: true,
    dialog: false,
  }),

  computed: {
    items: function() {
      return this.getAssetsByRoom(this.roomID);
    },
    ...mapGetters("administration/users", ["isAdmin"]),
    ...mapGetters("assets", ["getAssetsByRoom"]),
  },
  mounted: async function() {
    this.loading = false;
  },
  methods: {},
};
</script>

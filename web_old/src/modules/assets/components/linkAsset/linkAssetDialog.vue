<template>
  <v-dialog v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on">
        mdi-plus
      </v-icon>
    </template>
    <link-asset-card @close="dialog = !dialog"> </link-asset-card>
  </v-dialog>
</template>

<script>
import linkAssetCard from "./linkAssetCard.vue";
export default {
  name: "linkAssetDialog",
  components: {
    linkAssetCard
  },
  props: {},
  data: () => ({
    dialog: false
  })
};
</script>

<style></style>

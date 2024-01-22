<template>
  <v-dialog
    v-model="dialog"
    width="700">
    <template v-slot:activator="{ props }">
      <v-btn icon>
        <v-icon v-bind="props"> mdi-plus </v-icon>
      </v-btn>
    </template>
    <link-asset-card @close="dialog = !dialog"> </link-asset-card>
  </v-dialog>
</template>

<script>
import linkAssetCard from "./linkAssetCard.vue";
export default {
  name: "linkAssetDialog",
  components: {
    linkAssetCard,
  },
  props: {},
  data: () => ({
    dialog: false,
  }),
};
</script>

<style></style>

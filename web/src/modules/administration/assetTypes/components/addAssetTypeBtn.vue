<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mt-0"
        color="primary lighten-2"
        outlined
        dark
        v-bind="attrs"
        v-on="on"
      >
        Add Asset Type
      </v-btn>
    </template>
    <v-toolbar color="primary lighten-2" dark>
      <v-toolbar-title>Add Asset Type</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="dialog = !dialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card tile>
      <v-card-text>
        <v-form>
          <v-text-field v-model="assetType.name" label="Name" required>
          </v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "addAssetTypeBtn",
  data: () => ({
    dialog: false,
    assetType: {},
  }),
};
</script>

<style></style>

<template>
  <v-dialog
    v-model="dialog"
    width="500">
    <template v-slot:activator="{ props }">
      <v-btn
        color="primary"
        v-bind="props">
        Add Asset Type
      </v-btn>
    </template>
    <v-toolbar
      color="primary-lighten-2"
      dark>
      <v-toolbar-title>Add Asset Type</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click="dialog = !dialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card rounded="0">
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            class="mt-10"
            v-model="name"
            :rules="rules"
            label="Name"
            required>
          </v-text-field>
          <v-checkbox
            class="py-0 my-0"
            v-model="office"
            label="Office" />
          <v-checkbox
            class="py-0 my-0"
            v-model="person"
            label="Person" />
          <v-checkbox
            class="py-0 my-0"
            v-model="infrastructure"
            label="Infrastucture" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />

        <v-btn
          color="primary"
          variant="outlined"
          @click="dialog = !dialog">
          Cancel
        </v-btn>
        <v-btn
          label
          :disabled="!valid"
          color="primary"
          variant="flat"
          @click="doAddAssetType()">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "addAssetTypeBtn",
  data: () => ({
    dialog: false,
    name: "",
    office: false,
    person: false,
    infrastructure: false,
    selected: [],
    rules: [(v) => !!v || "Name is required"],
    valid: false,
  }),
  computed: {
    newAssetType: function () {
      return {
        name: this.name,
        office: this.office,
        person: this.person,
        infrastructure: this.infrastructure,
      };
    },
  },
  methods: {
    ...mapActions("administration/assetTypes", ["addAssetType"]),
    doAddAssetType: async function () {
      const resp = await this.addAssetType(this.newAssetType);
      if (resp) {
        this.dialog = false;
        this.name = "";
        this.office = false;
        this.person = false;
        this.infrastructure = false;
      }
      this.dialog = false;
      this.$emit("notify", resp);
    },
  },
};
</script>

<style></style>

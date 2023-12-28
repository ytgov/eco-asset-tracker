<template>
  <span>
    <v-btn variant="tonal" color="primary" @click="createNewKey()">
      Add
    </v-btn>
    <v-dialog max-width="600" v-model="dialog">
      <v-toolbar dark :color="appbarColor">
        <v-toolbar-title> Add Key </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon @click="close()"> mdi-close </v-icon>
      </v-toolbar>
      <v-card rounded="0">
        <v-card-text>
          <key-detail-form :edit="true"></key-detail-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="tonal" @click="create()">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>
<script>
import { mapActions, mapState } from "vuex";
import keyDetailForm from "./keyDetailForm.vue";
export default {
  name: "AddAssetBtn",
  components: {
    keyDetailForm,
  },
  data: () => ({
    valid: false,
    dialog: false,
    rules: {
      required: (value) => !!value || "Required.",
    },
    appbarColor: "yg_moss",
  }),
  computed: {
    ...mapState("keys", ["currentKey"]),
    activeLabel: function () {
      if (this.key.active == true) {
        return { text: "Active", color: "yg_moss" };
      } else {
        return { text: "Inactive", color: "red" };
      }
    },
  },
  methods: {
    ...mapActions("keys", ["createKey", "clearKey"]),

    close: function () {
      this.dialog = false;
      this.SET_ASSET = {};
    },

    create: async function () {
      if (this.currentKey.code) {
        await this.createKey(this.currentKey);
        await this.clearKey();
      } else {
        console.log("Key code is required in order to create a new key");
        console.log(this.key);
      }

      this.close();
    },
    createNewKey: async function () {
      await this.clearKey();
      this.dialog = true;
    },
  },
  mounted: async function () { },
};
</script>

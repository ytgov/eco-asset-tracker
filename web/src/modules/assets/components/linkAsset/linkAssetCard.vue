<template>
  <div>
    <v-toolbar dark :color="appbarColor">
      <v-toolbar-title> Link Assets </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="close()">
        mdi-close
      </v-icon>
    </v-toolbar>
    <v-card tile>
      <v-card-actions>
        <!-- <span class="text-h4">{{ room.name }}</span> -->
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-card-text>
        <link-asset-form> </link-asset-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="yg_blue" class="mr-3" dark @click="save()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import linkAssetForm from "./linkAssetForm.vue";
export default {
  name: "linkAssetCard",
  components: {
    linkAssetForm
  },
  data: () => ({
    room: {
      name: "Room 23"
    }
  }),
  computed: {
    appbarColor: function() {
      return "yg_moss";
    }
  },
  methods: {
    close: function() {
      this.$emit("close");
    },
    save: function() {
      this.close(); //replace with link asset methed (then close)
    }
  }
};
</script>

<style></style>

<template>
  <v-dialog v-model="warn" width="500">
    <v-toolbar dark :color="appbarColor">
      <v-toolbar-title> Warning </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-icon @click="close()">
          mdi-close
        </v-icon> -->
    </v-toolbar>
    <v-card tile>
      <v-card-actions>
        <!-- <span class="text-h4">{{ room.name }}</span> -->
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-card-text class="py-15">
        <div>
          This asset: {{ asset.assetNum }} is already assigned to
          {{ roomName(asset.room) }}.
        </div>

        <div class="pt-5">
          Would you you like reassign this asset to {{ room.name }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn dark color="yg_moss" @click="accept()">
          Reassign
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="yg_lichen" class="mr-3" dark @click="cancel()">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "linkAssetDialog",

  props: {
    warn: {
      type: Boolean,
      value: false
    },
    asset: {
      type: Object
    },
    room: {
      type: Object
    }
  },
  data: () => ({}),
  computed: {
    appbarColor: function() {
      return "yg_sun";
    },
    ...mapState("rooms", ["rooms"])
  },
  methods: {
    accept: function() {
      this.$emit("accept");
    },
    cancel: function() {
      this.$emit("cancel");
    },
    roomName: function(roomID) {
      //find the room in the list of rooms and return the name of the room matching roomID
      if (roomID && this.rooms.length > 0) {
        return this.rooms.find(room => room._id == roomID).name;
      }
    }
  }
};
</script>

<style></style>

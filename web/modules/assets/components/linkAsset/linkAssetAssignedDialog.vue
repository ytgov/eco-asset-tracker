<template>
  <v-dialog v-model="warn" width="500">
    <v-toolbar dark :color="appbarColor">
      <v-toolbar-title> Warning - Asset already assigned </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-icon @click="close()">
          mdi-close
        </v-icon> -->
    </v-toolbar>
    <v-card rounded="0">
      <v-card-actions>
        <!-- <span class="text-h4">{{ room.name }}</span> -->
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-card-text class="py-15">
        <div class="text-h6 text-center">
          Asset <span class="font-weight-bold">{{ asset.assetNum }}</span> is
          already assigned to {{ roomName(asset.room) }}.
        </div>

        <div class="pt-15 pb-0 text-subtitle-1  text-center">
          Would you you like reassign this asset to {{ room.name }}?
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn variant=tonal color="primary" @click="accept()">
          Re-Assign
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" color="primary" class="mr-3" @click="cancel()">
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
      value: false,
    },
    asset: {
      type: Object,
    },
    room: {
      type: Object,
    },
  },
  data: () => ({}),
  computed: {
    appbarColor: function () {
      return "yg_sun";
    },
    ...mapState("rooms", ["rooms"]),
  },
  methods: {
    accept: function () {
      this.$emit("accept");
    },
    cancel: function () {
      this.$emit("cancel");
    },
    roomName: function (roomID) {
      //find the room in the list of rooms and return the name of the room matching roomID
      if (roomID && this.rooms.length > 0) {
        return this.rooms.find((room) => room._id == roomID).name;
      }
    },
  },
};
</script>

<style></style>

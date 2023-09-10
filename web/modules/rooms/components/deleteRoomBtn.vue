<template>
  <v-btn dark color="yg_lichen" @click="doIt()">
    Delete
  </v-btn>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "DeleteRoomBtn",
  components: {
    // departmentFormASummary,
  },
  props: {
    search: {
      type: String,
      default: ""
    },
    roomID: {
      type: Number,
      default: -1
    }
  },

  data: () => ({
    // formAItems: [],
    // loadingFormA: false,
  }),
  methods: {
    ...mapActions("rooms", ["deleteRoom"]),
    doIt: function() {
      this.deleteRoom(this.roomID);
      this.$emit("close");
    }
  }
};
</script>
